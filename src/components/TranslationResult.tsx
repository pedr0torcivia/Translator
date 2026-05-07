interface Props {
  translatedText: string;
  onCopyTranslation: () => void;
}

export default function TranslationResult({ translatedText, onCopyTranslation }: Props) {
  return (
    <div className="card">
      <h2>Traducción</h2>
      <p>{translatedText || 'Todavía no hay traducción.'}</p>
      <button onClick={onCopyTranslation} disabled={!translatedText}>Copiar traducción</button>
    </div>
  );
}
