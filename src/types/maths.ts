// Calculus paid off! (2D vector)
export class Vec2 {
	static ZERO = new Vec2(0, 0);
	static ONE = new Vec2(1, 0);

	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}

	inverse() {
		return new Vec2(-this.x, -this.y);
	}

	unit() {
		const mag = this.magnitude();
		if (mag === 0) return Vec2.ZERO;
		return new Vec2(this.x / mag, this.y / mag);
	}

	dot(vec: Vec2) {
		return this.x * vec.x + this.y * vec.y;
	}

	angleBetween(vec: Vec2) {
		return Math.acos(this.dot(vec) / (this.magnitude() * vec.magnitude()));
	}

	angle() {
		// Magnitude of unit vector is 1
		const angle = Math.acos((this.x) / (this.magnitude()));
		if (this.y > 0) return angle;
		else return -angle;
	}

	addAngle(radian: number) {
		const angle = this.angle() + radian;
		const mag = this.magnitude();
		return new Vec2(mag * Math.cos(angle), mag * Math.sin(angle));
	}
	
	addVec(vec: Vec2) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	addX(x: number) {
		return new Vec2(this.x + x, this.y);
	}

	addY(y: number) {
		return new Vec2(this.x, this.y + y);
	}

	scale(x: number, y: number) {
		return new Vec2(this.x * x, this.y * y);
	}

	scaleAll(ratio: number) {
		return this.scale(ratio, ratio);
	}
}

// Rectangle hitbox with a width and height
export class RectHitbox {
	static ZERO = new RectHitbox(0, 0);

	type = "rect";
	width: number;
	height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	comparable() {
		return this.width;
	}
}

// Circular hitbox with a radius
export class CircleHitbox {
	static ZERO = new CircleHitbox(0);

	type = "circle";
	radius: number;

	constructor(radius: number) {
		this.radius = radius;
	}

	comparable() {
		return this.radius;
	}
}

export type Hitbox = RectHitbox | CircleHitbox;

export enum MovementDirection {
	RIGHT = 0,
	UP = 1,
	LEFT = 2,
	DOWN = 3
}