import type { LanguageCode, SourceLanguageCode } from '../types';

interface Props {
  sourceLanguage: SourceLanguageCode;
  targetLanguage: LanguageCode;
  onSourceChange: (value: SourceLanguageCode) => void;
  onTargetChange: (value: LanguageCode) => void;
}

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'Inglés' },
  { code: 'pt', label: 'Portugués' },
  { code: 'fr', label: 'Francés' },
  { code: 'de', label: 'Alemán' },
  { code: 'it', label: 'Italiano' },
] as const;

export default function LanguageSelector({ sourceLanguage, targetLanguage, onSourceChange, onTargetChange }: Props) {
  return (
    <div className="selectors">
      <label>
        Idioma origen
        <select value={sourceLanguage} onChange={(e) => onSourceChange(e.target.value as SourceLanguageCode)}>
          <option value="auto">Detectar automáticamente</option>
          {languages.map((lang) => (
            <option key={`source-${lang.code}`} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </label>
      <label>
        Idioma destino
        <select value={targetLanguage} onChange={(e) => onTargetChange(e.target.value as LanguageCode)}>
          {languages.map((lang) => (
            <option key={`target-${lang.code}`} value={lang.code}>{lang.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
