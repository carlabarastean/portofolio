from io import BytesIO
from pathlib import Path
import sys

from PIL import Image
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject


def main() -> None:
    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    quality = int(sys.argv[3])

    reader = PdfReader(source)
    writer = PdfWriter()
    writer.pdf_header = "%PDF-1.5"
    writer.clone_document_from_reader(reader)

    source_image = reader.pages[0].images[0]
    if source_image.indirect_reference is None:
        raise ValueError("The source image is not an indirect PDF object")
    source_object = source_image.indirect_reference.get_object()

    width = int(source_object["/Width"])
    height = int(source_object["/Height"])
    rgb_image = Image.frombytes("RGB", (width, height), source_object.get_data())

    jpeg_buffer = BytesIO()
    rgb_image.save(
        jpeg_buffer,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        subsampling=0,
    )

    writer_image = writer.pages[0].images[0]
    if writer_image.indirect_reference is None:
        raise ValueError("The cloned image is not an indirect PDF object")
    writer_object = writer_image.indirect_reference.get_object()
    writer_object._data = jpeg_buffer.getvalue()
    writer_object[NameObject("/Filter")] = NameObject("/DCTDecode")
    writer_object.pop(NameObject("/DecodeParms"), None)

    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("wb") as output_file:
        writer.write(output_file)


if __name__ == "__main__":
    main()
