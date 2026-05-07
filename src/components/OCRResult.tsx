interface Props {
  image: string | null;
  detectedText: string;
  detectedLanguage: string;
  onCopyText: () => void;
}

export default function OCRResult({ image, detectedText, detectedLanguage, onCopyText }: Props) {
  return (
    <div className="card">
      <h2>Resultado OCR</h2>
      {image ? <img src={image} alt="Captura" className="capture" /> : <p>Aún no capturaste imagen.</p>}
      <p><strong>Idioma detectado:</strong> {detectedLanguage || 'No detectado'}</p>
      <p><strong>Texto detectado:</strong> {detectedText || 'Sin texto detectado'}</p>
      <button onClick={onCopyText} disabled={!detectedText}>Copiar texto</button>
    </div>
  );
}
