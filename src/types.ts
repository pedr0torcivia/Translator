export type AppState =
  | 'idle'
  | 'camera_active'
  | 'image_captured'
  | 'reading_text'
  | 'text_detected'
  | 'translating'
  | 'translated'
  | 'error';

export type LanguageCode = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it';
export type SourceLanguageCode = LanguageCode | 'auto';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
}

export interface OCRResponse {
  text: string;
}

export interface TranslationResponse {
  translatedText: string;
}
