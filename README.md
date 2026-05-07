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

Abrí la URL local indicada por Vite (normalmente `http://localhost:5173`).

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
