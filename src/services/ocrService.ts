import { recognize } from 'tesseract.js';
import type { OCRResponse } from '../types';

const OCR_LANGS = 'eng+spa+por+fra+deu+ita';
const OCR_BACKEND_URL = import.meta.env.VITE_OCR_BACKEND_URL as string | undefined;

async function localOCR(imageDataUrl: string): Promise<OCRResponse> {
  const result = await recognize(imageDataUrl, OCR_LANGS);
  const cleanedText = result.data.text.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
  return { text: cleanedText, provider: 'local_tesseract' };
}

async function backendOCR(imageDataUrl: string): Promise<OCRResponse> {
  const blob = await (await fetch(imageDataUrl)).blob();
  const formData = new FormData();
  formData.append('image', blob, 'capture.png');

  const response = await fetch(`${OCR_BACKEND_URL}/ocr`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('No se pudo procesar OCR en el backend.');
  }

  const data = await response.json();
  const text = String(data?.text ?? '').replace(/\s+/g, ' ').trim();
  return { text, provider: 'remote_ml', confidence: Number(data?.confidence ?? 0) };
}

export async function extractTextFromImage(imageDataUrl: string): Promise<OCRResponse> {
  if (OCR_BACKEND_URL) {
    return backendOCR(imageDataUrl);
  }
  return localOCR(imageDataUrl);
}
