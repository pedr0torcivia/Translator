import { useRef, useState } from 'react';
import CameraCapture from './components/CameraCapture';
import LanguageSelector from './components/LanguageSelector';
import OCRResult from './components/OCRResult';
import TranslationResult from './components/TranslationResult';
import { detectSourceLanguage } from './services/languageDetectionService';
import { extractTextFromImage } from './services/ocrService';
import { translateText } from './services/translationService';
import type { AppState, LanguageCode, SourceLanguageCode } from './types';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [appState, setAppState] = useState<AppState>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectedText, setDetectedText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<SourceLanguageCode>('auto');
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguageCode>('auto');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('en');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [ocrProvider, setOcrProvider] = useState('');
  const [ocrConfidence, setOcrConfidence] = useState<number | null>(null);

  const activateCamera = async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Tu navegador no soporta acceso a cámara.');
      setAppState('error');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setAppState('camera_active');
    } catch {
      setError('No pudimos acceder a la cámara. Revisá los permisos del navegador.');
      setAppState('error');
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);
    setDetectedText('');
    setTranslatedText('');
    setDetectedLanguage('auto');
    setAppState('image_captured');
  };

  const handleReadText = async () => {
    if (!capturedImage) return;
    setAppState('reading_text');
    setError(null);

    try {
      const { text, provider, confidence } = await extractTextFromImage(capturedImage);
      setOcrProvider(provider);
      setOcrConfidence(typeof confidence === 'number' ? confidence : null);
      if (!text) {
        setError('No se detectó texto en la imagen capturada.');
        setAppState('error');
        return;
      }
      setDetectedText(text);

      const lang = detectSourceLanguage(text);
      if (!lang) {
        setError('No pudimos detectar el idioma automáticamente. Elegí el idioma origen manualmente.');
        setDetectedLanguage('auto');
      } else {
        setDetectedLanguage(lang);
        if (sourceLanguage === 'auto') {
          setSourceLanguage(lang);
        }
      }
      setAppState('text_detected');
    } catch {
      setError('Ocurrió un error al leer el texto con OCR.');
      setAppState('error');
    }
  };

  const handleTranslate = async () => {
    if (!detectedText) return;
    setAppState('translating');
    setError(null);

    try {
      const resolvedSource = sourceLanguage === 'auto' ? detectedLanguage : sourceLanguage;
      if (resolvedSource === 'auto') {
        setError('Seleccioná manualmente el idioma origen para traducir.');
        setAppState('error');
        return;
      }

      const { translatedText: result } = await translateText(detectedText, resolvedSource, targetLanguage);
      setTranslatedText(result);
      setAppState('translated');
    } catch {
      setError('No fue posible completar la traducción. Intentá nuevamente más tarde.');
      setAppState('error');
    }
  };

  return (
    <main className="container">
      <h1>LensTranslate</h1>
      <p className="privacy-note">La imagen se procesa localmente; solo el texto reconocido se envía para traducir.</p>

      <LanguageSelector
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onSourceChange={setSourceLanguage}
        onTargetChange={setTargetLanguage}
      />

      <CameraCapture
        onActivateCamera={activateCamera}
        onCaptureImage={captureImage}
        cameraError={error}
        isCameraActive={appState === 'camera_active' || appState === 'image_captured'}
        isBusy={appState === 'reading_text' || appState === 'translating'}
        videoRef={videoRef}
      />

      <div className="actions">
        <button onClick={handleReadText} disabled={!capturedImage || appState === 'reading_text'}>Leer texto</button>
        <button onClick={handleTranslate} disabled={!detectedText || appState === 'translating'}>Traducir</button>
        <button onClick={captureImage} disabled={appState !== 'camera_active'}>Volver a capturar</button>
      </div>

      <p className="status">Estado: {appState}</p>
      {appState === 'reading_text' && <p>Procesando OCR...</p>}
      {appState === 'translating' && <p>Traduciendo texto...</p>}
      {ocrProvider && <p>Motor OCR: {ocrProvider}{ocrConfidence !== null ? ` (confianza media: ${ocrConfidence.toFixed(2)})` : ''}</p>}
      {error && <p className="error">{error}</p>}

      <OCRResult
        image={capturedImage}
        detectedText={detectedText}
        detectedLanguage={detectedLanguage}
        onCopyText={() => navigator.clipboard.writeText(detectedText)}
      />
      <TranslationResult
        translatedText={translatedText}
        onCopyTranslation={() => navigator.clipboard.writeText(translatedText)}
      />
    </main>
  );
}
