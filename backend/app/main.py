from io import BytesIO
from typing import Any

import easyocr
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI(title="LensTranslate OCR API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(["en", "es", "pt", "fr", "de", "it"], gpu=False)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ocr")
async def ocr_image(image: UploadFile = File(...)) -> dict[str, Any]:
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo debe ser una imagen.")

    raw = await image.read()
    if not raw:
        raise HTTPException(status_code=400, detail="La imagen está vacía.")

    try:
        pil = Image.open(BytesIO(raw)).convert("RGB")
        arr = np.array(pil)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail="No se pudo leer la imagen.") from exc

    results = reader.readtext(arr, detail=1, paragraph=True)
    if not results:
        return {"text": "", "confidence": 0}

    text_chunks = [str(item[1]).strip() for item in results if len(item) >= 2 and str(item[1]).strip()]
    confidences = [float(item[2]) for item in results if len(item) >= 3]

    text = " ".join(text_chunks).replace("\n", " ").strip()
    confidence = sum(confidences) / len(confidences) if confidences else 0

    return {"text": text, "confidence": round(confidence, 4)}
