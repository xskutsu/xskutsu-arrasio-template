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

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

class PacketBuilder {
	private buffer: Uint8Array;
	private view: DataView;
	private offset: number;

	constructor(initialSize: number = 256) {
		this.buffer = new Uint8Array(initialSize);
		this.view = new DataView(this.buffer.buffer);
		this.offset = 0;
	}

	private ensureSize(bytesNeeded: number): void {
		if (this.offset + bytesNeeded > this.buffer.length) {
			const newSize = Math.max(this.buffer.length * 2, this.offset + bytesNeeded);
			const newBuf = new Uint8Array(newSize);
			newBuf.set(this.buffer);
			this.buffer = newBuf;
			this.view = new DataView(this.buffer.buffer);
		}
	}

	public writeUint8(val: number): void {
		this.ensureSize(1);
		this.view.setUint8(this.offset, val);
		this.offset += 1;
	}
	public writeInt8(val: number): void {
		this.ensureSize(1);
		this.view.setInt8(this.offset, val);
		this.offset += 1;
	}
	public writeUint16(val: number): void {
		this.ensureSize(2);
		this.view.setUint16(this.offset, val, true);
		this.offset += 2;
	}
	public writeInt16(val: number): void {
		this.ensureSize(2);
		this.view.setInt16(this.offset, val, true);
		this.offset += 2;
	}
	public writeUint32(val: number): void {
		this.ensureSize(4);
		this.view.setUint32(this.offset, val, true);
		this.offset += 4;
	}
	public writeInt32(val: number): void {
		this.ensureSize(4);
		this.view.setInt32(this.offset, val, true);
		this.offset += 4;
	}
	public writeFloat32(val: number): void {
		this.ensureSize(4);
		this.view.setFloat32(this.offset, val, true);
		this.offset += 4;
	}
	public writeFloat64(val: number): void {
		this.ensureSize(8);
		this.view.setFloat64(this.offset, val, true);
		this.offset += 8;
	}

	public writeString(str: string): void {
		const encoded = textEncoder.encode(str);
		const len = encoded.length;
		this.writeUint8(Tag.STRING);
		this.writeUint16(len);
		this.ensureSize(len);
		this.buffer.set(encoded, this.offset);
		this.offset += len;
	}

	public getPacket(): Uint8Array {
		return this.buffer.slice(0, this.offset);
	}
}

export function encode(inputArray: EncodableValue[]): Uint8Array {
	const builder = new PacketBuilder();
	for (const value of inputArray) {
		if (typeof value === 'string') {
			builder.writeString(value);
		} else if (typeof value === 'boolean') {
			builder.writeUint8(value ? Tag.TRUE : Tag.FALSE);
		} else if (typeof value === 'number') {
			if (!Number.isFinite(value)) {
				throw new Error("Cannot encode Infinity or NaN");
			}
			if (Number.isInteger(value)) {
				if (value >= 0) {
					if (value < MAX_EIGHT_BIT_UNSIGNED) {
						builder.writeUint8(Tag.UINT8);
						builder.writeUint8(value);
					} else if (value < MAX_SIXTEEN_BIT_UNSIGNED) {
						builder.writeUint8(Tag.UINT16);
						builder.writeUint16(value);
					} else if (value < MAX_THIRTY_TWO_BIT_UNSIGNED) {
						builder.writeUint8(Tag.UINT32);
						builder.writeUint32(value);
					} else {
						builder.writeUint8(Tag.FLOAT64);
						builder.writeFloat64(value);
					}
				} else {
					if (value >= MIN_EIGHT_BIT_SIGNED) {
						builder.writeUint8(Tag.INT8);
						builder.writeInt8(value);
					} else if (value >= MIN_SIXTEEN_BIT_SIGNED) {
						builder.writeUint8(Tag.INT16);
						builder.writeInt16(value);
					} else if (value >= MIN_THIRTY_TWO_BIT_SIGNED) {
						builder.writeUint8(Tag.INT32);
						builder.writeInt32(value);
					} else {
						builder.writeUint8(Tag.FLOAT64);
						builder.writeFloat64(value);
					}
				}
			} else {
				builder.writeUint8(Tag.FLOAT32);
				builder.writeFloat32(value);
			}
		} else {
			throw new Error(`Unsupported data type: ${typeof value}`);
		}
	}
	return builder.getPacket();
}

export function decode(rawBuffer: ArrayBuffer | Uint8Array): EncodableValue[] {
	const buffer = rawBuffer instanceof Uint8Array ? rawBuffer : new Uint8Array(rawBuffer);
	const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
	let offset = 0;
	const output: EncodableValue[] = [];
	while (offset < buffer.length) {
		const tag = view.getUint8(offset) as Tag;
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
				const len = view.getUint16(offset, true);
				offset += 2;
				const strBytes = buffer.subarray(offset, offset + len);
				output.push(textDecoder.decode(strBytes));
				offset += len;
			}; break;
			default: {
				throw new Error(`Unknown Protocol Tag: ${tag} at offset ${offset - 1}`);
			};
		}
	}
	return output;
}

const input = [1, false, 5.5, "HELO WORLD"];
const packet = encode(input);
const output = decode(packet);
console.log(input, packet, output);
