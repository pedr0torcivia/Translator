import { franc } from 'franc-min';
import type { SourceLanguageCode } from '../types';

const francToIsoMap: Record<string, SourceLanguageCode> = {
  spa: 'es',
  eng: 'en',
  por: 'pt',
  fra: 'fr',
  deu: 'de',
  ita: 'it',
};

export function detectSourceLanguage(text: string): SourceLanguageCode | null {
  if (!text || text.length < 3) return null;
  const code3 = franc(text, { minLength: 3 });
  if (code3 === 'und') return null;
  return francToIsoMap[code3] ?? null;
}
