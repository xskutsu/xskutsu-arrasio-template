export type EncodableValue = string | number | boolean;

const MAX_EIGHT_BIT_UNSIGNED: number = 0x100;
const MAX_SIXTEEN_BIT_UNSIGNED: number = 0x10000;
const MAX_THIRTY_TWO_BIT_UNSIGNED: number = 0x100000000;
const MIN_EIGHT_BIT_SIGNED: number = -0x80;
const MIN_SIXTEEN_BIT_SIGNED: number = -0x8000;
const MIN_THIRTY_TWO_BIT_SIGNED: number = -0x80000000;

const enum Tag {
	TRUE = 1,
	FALSE = 2,
	UINT8 = 3,
	UINT16 = 4,
	UINT32 = 5,
	INT8 = 6,
	INT16 = 7,
	INT32 = 8,
	FLOAT32 = 9,
	FLOAT64 = 10,
	STRING = 11
}

const textEncoder: TextEncoder = new TextEncoder();
const textDecoder: TextDecoder = new TextDecoder("utf-8");

class PacketBuilder {
	private static buffer: Uint8Array = new Uint8Array(4096);
	private static view: DataView = new DataView(this.buffer.buffer);
	private static offset: number = 0;

	private static ensureSize(bytesNeeded: number): void {
		if (this.offset + bytesNeeded > this.buffer.length) {
			const newSize: number = Math.max(this.buffer.length * 2, this.offset + bytesNeeded);
			const newBuf: Uint8Array = new Uint8Array(newSize);
			newBuf.set(this.buffer);
			this.buffer = newBuf;
			this.view = new DataView(this.buffer.buffer);
		}
	}

	public static prepare(): void {
		this.offset = 0;
	}

	public static writeUint8(value: number): void {
		this.ensureSize(1);
		this.view.setUint8(this.offset, value);
		this.offset += 1;
	}

	public static writeInt8(value: number): void {
		this.ensureSize(1);
		this.view.setInt8(this.offset, value);
		this.offset += 1;
	}

	public static writeUint16(value: number): void {
		this.ensureSize(2);
		this.view.setUint16(this.offset, value, true);
		this.offset += 2;
	}

	public static writeInt16(value: number): void {
		this.ensureSize(2);
		this.view.setInt16(this.offset, value, true);
		this.offset += 2;
	}

	public static writeUint32(value: number): void {
		this.ensureSize(4);
		this.view.setUint32(this.offset, value, true);
		this.offset += 4;
	}

	public static writeInt32(value: number): void {
		this.ensureSize(4);
		this.view.setInt32(this.offset, value, true);
		this.offset += 4;
	}

	public static writeFloat32(value: number): void {
		this.ensureSize(4);
		this.view.setFloat32(this.offset, value, true);
		this.offset += 4;
	}

	public static writeFloat64(value: number): void {
		this.ensureSize(8);
		this.view.setFloat64(this.offset, value, true);
		this.offset += 8;
	}

	public static writeString(str: string): void {
		const encoded: Uint8Array<ArrayBuffer> = textEncoder.encode(str);
		const length: number = encoded.length;
		this.writeUint8(Tag.STRING);
		this.writeUint16(length);
		this.ensureSize(length);
		this.buffer.set(encoded, this.offset);
		this.offset += length;
	}

	public static getPacket(): Uint8Array {
		return this.buffer.slice(0, this.offset);
	}
}

export function encode(inputArray: EncodableValue[]): Uint8Array {
	PacketBuilder.prepare();
	for (const valueue of inputArray) {
		if (typeof valueue === "string") {
			PacketBuilder.writeString(valueue);
		} else if (typeof valueue === "boolean") {
			PacketBuilder.writeUint8(valueue ? Tag.TRUE : Tag.FALSE);
		} else if (typeof valueue === "number") {
			if (!Number.isFinite(valueue)) {
				throw new Error("Cannot encode Infinity or NaN");
			}
			if (Number.isInteger(valueue)) {
				if (valueue >= 0) {
					if (valueue < MAX_EIGHT_BIT_UNSIGNED) {
						PacketBuilder.writeUint8(Tag.UINT8);
						PacketBuilder.writeUint8(valueue);
					} else if (valueue < MAX_SIXTEEN_BIT_UNSIGNED) {
						PacketBuilder.writeUint8(Tag.UINT16);
						PacketBuilder.writeUint16(valueue);
					} else if (valueue < MAX_THIRTY_TWO_BIT_UNSIGNED) {
						PacketBuilder.writeUint8(Tag.UINT32);
						PacketBuilder.writeUint32(valueue);
					} else {
						PacketBuilder.writeUint8(Tag.FLOAT64);
						PacketBuilder.writeFloat64(valueue);
					}
				} else {
					if (valueue >= MIN_EIGHT_BIT_SIGNED) {
						PacketBuilder.writeUint8(Tag.INT8);
						PacketBuilder.writeInt8(valueue);
					} else if (valueue >= MIN_SIXTEEN_BIT_SIGNED) {
						PacketBuilder.writeUint8(Tag.INT16);
						PacketBuilder.writeInt16(valueue);
					} else if (valueue >= MIN_THIRTY_TWO_BIT_SIGNED) {
						PacketBuilder.writeUint8(Tag.INT32);
						PacketBuilder.writeInt32(valueue);
					} else {
						PacketBuilder.writeUint8(Tag.FLOAT64);
						PacketBuilder.writeFloat64(valueue);
					}
				}
			} else {
				PacketBuilder.writeUint8(Tag.FLOAT32);
				PacketBuilder.writeFloat32(valueue);
			}
		} else {
			throw new Error(`Unsupported data type: ${typeof valueue}`);
		}
	}
	return PacketBuilder.getPacket();
}

export function decode(rawBuffer: ArrayBuffer | Uint8Array): EncodableValue[] {
	const buffer: Uint8Array<ArrayBufferLike> = rawBuffer instanceof Uint8Array ? rawBuffer : new Uint8Array(rawBuffer);
	const view: DataView<ArrayBufferLike> = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
	let offset: number = 0;
	const output: EncodableValue[] = [];
	while (offset < buffer.length) {
		const tag: number = view.getUint8(offset) as Tag;
		offset += 1;
		switch (tag) {
			case Tag.TRUE: {
				output.push(true);
			}; break;
			case Tag.FALSE: {
				output.push(false);
			}; break;
			case Tag.UINT8: {
				output.push(view.getUint8(offset));
				offset += 1;
			}; break;
			case Tag.UINT16: {
				output.push(view.getUint16(offset, true));
				offset += 2;
			}; break;
			case Tag.UINT32: {
				output.push(view.getUint32(offset, true));
				offset += 4;
			}; break;
			case Tag.INT8: {
				output.push(view.getInt8(offset));
				offset += 1;
			}; break;
			case Tag.INT16: {
				output.push(view.getInt16(offset, true));
				offset += 2;
			}; break;
			case Tag.INT32: {
				output.push(view.getInt32(offset, true));
				offset += 4;
			}; break;
			case Tag.FLOAT32: {
				output.push(view.getFloat32(offset, true));
				offset += 4;
			}; break;
			case Tag.FLOAT64: {
				output.push(view.getFloat64(offset, true));
				offset += 8;
			}; break;
			case Tag.STRING: {
				const length: number = view.getUint16(offset, true);
				offset += 2;
				const strBytes: Uint8Array<ArrayBufferLike> = buffer.subarray(offset, offset + length);
				output.push(textDecoder.decode(strBytes));
				offset += length;
			}; break;
			default: {
				throw new Error(`Unknown Protocol Tag: ${tag} at offset ${offset - 1}`);
			};
		}
	}
	return output;
}
