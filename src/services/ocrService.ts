import { recognize } from 'tesseract.js';
import type { OCRResponse } from '../types';

const OCR_LANGS = 'eng+spa+por+fra+deu+ita';

export async function extractTextFromImage(imageDataUrl: string): Promise<OCRResponse> {
  const result = await recognize(imageDataUrl, OCR_LANGS);
  const cleanedText = result.data.text.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
  return { text: cleanedText };
}
