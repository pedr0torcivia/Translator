import argparse
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepara estructura de dataset OCR")
    parser.add_argument("--input", required=True, help="Directorio origen con imágenes y etiquetas")
    parser.add_argument("--output", required=True, help="Directorio destino")
    args = parser.parse_args()

    output = Path(args.output)
    (output / "train" / "images").mkdir(parents=True, exist_ok=True)
    (output / "val" / "images").mkdir(parents=True, exist_ok=True)

    print("Estructura creada en", output)
    print("Copiá imágenes/labels y luego entrená el modelo elegido.")


if __name__ == "__main__":
    main()
