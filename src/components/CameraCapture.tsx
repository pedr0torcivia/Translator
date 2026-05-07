import { useRef } from 'react';

interface Props {
  onActivateCamera: () => void;
  onCaptureImage: () => void;
  cameraError: string | null;
  isCameraActive: boolean;
  isBusy: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function CameraCapture({ onActivateCamera, onCaptureImage, cameraError, isCameraActive, isBusy, videoRef }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card" ref={containerRef}>
      <h2>Cámara</h2>
      <video ref={videoRef} autoPlay playsInline muted className="video" />
      <div className="actions">
        <button onClick={onActivateCamera} disabled={isCameraActive || isBusy}>Activar cámara</button>
        <button onClick={onCaptureImage} disabled={!isCameraActive || isBusy}>Capturar imagen</button>
      </div>
      {cameraError && <p className="error">{cameraError}</p>}
    </div>
  );
}
