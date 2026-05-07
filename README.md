# LensTranslate

LensTranslate es una aplicación web (React + Vite + TypeScript) que permite:
- Activar la cámara del dispositivo.
- Capturar una imagen.
- Ejecutar OCR en el navegador con Tesseract.js.
- Detectar automáticamente el idioma del texto reconocido.
- Traducir el texto con la API gratuita de MyMemory.

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

## Probar en teléfono (Android/iOS)

### Opción 1: misma red Wi-Fi (rápida)
1. Ejecutá `npm run dev` en tu computadora.
2. Vite queda escuchando en red local (`0.0.0.0`) en `5173`.
3. Buscá la IP local de tu PC (ej: `192.168.1.34`).
4. Desde el teléfono abrí `http://TU_IP:5173`.

> Nota importante: algunos navegadores no habilitan cámara en HTTP no seguro para IP LAN. Si la cámara falla, usá la opción 2.

### Opción 2: túnel HTTPS (recomendado para cámara)
Con HTTPS, `getUserMedia` suele funcionar mejor en móviles.

Ejemplo con ngrok:
```bash
ngrok http 5173
```
Luego abrí en el teléfono la URL `https://...ngrok...`.

## Cómo probar el flujo principal

1. Presioná **Activar cámara** y concedé permisos.
2. Presioná **Capturar imagen**.
3. Presioná **Leer texto** para ejecutar OCR.
4. Revisá idioma detectado o elegí idioma origen manual.
5. Elegí idioma destino.
6. Presioná **Traducir**.

## Privacidad y seguridad

- La imagen se procesa **localmente** en el navegador.
- Solo se envía a MyMemory el texto extraído por OCR.

## Limitaciones del MVP

- El OCR puede fallar con imágenes borrosas, texto manuscrito o mala iluminación.
- La detección automática del idioma depende de la calidad del texto reconocido.
- MyMemory tiene límites gratuitos diarios.
- En producción conviene usar una API más robusta o desplegar una instancia propia de LibreTranslate.

## Mejoras futuras sugeridas

- Selector de resolución de captura y recorte de imagen.
- Historial de traducciones.
- Soporte offline parcial para OCR.
- Integración opcional con LibreTranslate para auto-hosting.
- Mejoras de accesibilidad (atajos de teclado, ARIA extra, i18n UI).

## OCR avanzado con modelo ML (Opción B)

Si querés mayor precisión, podés usar backend OCR:

1. Crear entorno Python e instalar dependencias:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r backend/requirements.txt
   ```
2. Levantar API OCR:
   ```bash
   uvicorn backend.app.main:app --reload --port 8000
   ```
3. En el frontend, crear `.env`:
   ```bash
   VITE_OCR_BACKEND_URL=http://localhost:8000
   ```
4. Ejecutar frontend (`npm run dev`).

Sin variable `VITE_OCR_BACKEND_URL`, la app usa OCR local (Tesseract).
