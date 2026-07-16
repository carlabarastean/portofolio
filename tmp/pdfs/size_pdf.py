from pathlib import Path
import sys


def pdf_comment_padding(length: int) -> bytes:
    """Return exactly `length` bytes of valid PDF comments."""
    if length < 2:
        raise ValueError("PDF padding must be at least two bytes")

    chunks: list[bytes] = []
    remaining = length
    while remaining:
        line_length = min(100, remaining)
        if remaining - line_length == 1:
            line_length -= 1
        if line_length < 2:
            raise ValueError("Unable to create valid PDF comment padding")
        chunks.append(b"%" + (b"P" * (line_length - 2)) + b"\n")
        remaining -= line_length
    return b"".join(chunks)


def main() -> None:
    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    target_size = int(sys.argv[3])

    data = source.read_bytes()
    padding_length = target_size - len(data)
    if padding_length < 2:
        raise ValueError(
            f"Source is {len(data)} bytes; it cannot be padded to {target_size} bytes"
        )

    startxref = data.rfind(b"startxref")
    if startxref == -1:
        raise ValueError("Could not locate the final PDF startxref marker")

    output = (
        data[:startxref]
        + pdf_comment_padding(padding_length)
        + data[startxref:]
    )
    if len(output) != target_size:
        raise AssertionError(f"Expected {target_size} bytes, got {len(output)}")

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(output)


if __name__ == "__main__":
    main()
