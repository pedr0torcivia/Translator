# Entrenamiento OCR (Opción B)

Este directorio define un flujo para mejorar precisión con un modelo propio.

## 1) Dataset
Estructura recomendada:

```
backend/train/dataset/
  train/
    images/
    labels.csv
  val/
    images/
    labels.csv
```

`labels.csv`:

```csv
filename,text
img_0001.jpg,"Texto real de la imagen"
```

## 2) Preparación
```bash
python backend/train/prepare_dataset.py --input ./raw_data --output ./backend/train/dataset
```

## 3) Fine-tuning sugerido
Para producción, se recomienda fine-tuning de TrOCR o PaddleOCR con GPU.
Este repositorio deja la API desacoplada para reemplazar EasyOCR por un modelo entrenado.

## 4) Métricas
Evaluar con CER/WER en validación. No promover a producción sin mejora medible frente al baseline.
