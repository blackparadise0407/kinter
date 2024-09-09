// export class Vector2 {
// 	#x: number;
// 	#y: number;

// 	// constructor(...args: number[] | Vector2[]) {
// 	// 	if (!args?.length) {
// 	// 		this.#x = 0;
// 	// 		this.#y = 0;
// 	// 	} else if (args.length === 1) {
// 	// 		if (args[0] instanceof Vector2) {

// 	// 		}  else {

// 	// 			this.#x = args[0];
// 	// 			this.#y = args[0];
// 	// 		}
// 	// 	} else if (args.length === 2) {
// 	// 		this.#x = args[0];
// 	// 		this.#y = args[1];
// 	// 	} else {
// 	// 		throw new SyntaxError('Invalid arguments for Vector2');
// 	// 	}
// 	// }

// 	public get x(): number {
// 		return this.#x;
// 	}

// 	public get y(): number {
// 		return this.#y;
// 	}

// 	public add(other: Vector2): Vector2 {
// 		this.#x = this.#x + other.#x;
// 		this.#y = this.#y + other.#y;
// 		return this;
// 	}
// }
export type Vector2 = [number, number];
export const mulVec2 = (v1: Vector2, v2: Vector2) => v1[0] * v2[0] + v1[1] * v2[1];
export const absVec2 = (v: Vector2) => Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
export const scalarVec2 = (v: Vector2, x: number): Vector2 => [v[0] * x, +v[1] * x];
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;
export const degToRad = (deg: number) => (deg * Math.PI) / 180;
export const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);
export const fromVec2 = (v1: Vector2, v2: Vector2): Vector2 => [v2[0] - v1[0], v2[1] - v1[1]];
