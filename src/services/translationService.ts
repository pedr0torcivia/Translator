import type { SourceLanguageCode, TranslationResponse, LanguageCode } from '../types';

export async function translateText(
  text: string,
  sourceLang: SourceLanguageCode,
  targetLang: LanguageCode,
): Promise<TranslationResponse> {
  const query = encodeURIComponent(text);
  const source = sourceLang === 'auto' ? 'auto' : sourceLang;
  const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=${source}|${targetLang}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('No se pudo conectar con el servicio de traducción.');
  }

  const data = await response.json();
  const translatedText = data?.responseData?.translatedText?.trim();
  if (!translatedText) {
    throw new Error('La API no devolvió una traducción válida.');
  }

  return { translatedText };
}
