import { Entity } from "../../types/entities";
import { MinEntity } from "../../types/minimized";
import { circleFromCenter } from "../../utils";
import Player from "./player";

const images = new Map<string, HTMLImageElement & { loaded: boolean }>();

interface AdditionalEntity {
	name: string;
	color: GunColor;
}

const HEX_COLORS = ["#F2A500", "#F20000", "#0061F2", "#039700"];

export enum GunColor {
	YELLOW = 0,
	RED = 1,
	BLUE = 2,
	GREEN = 3
}

export default class Gun extends Entity {
	type = "gun";
	name: string;
	color: GunColor;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.name = minEntity.name;
		this.color = minEntity.color;
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		const radius = scale * this.hitbox.comparable;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.strokeStyle = HEX_COLORS[this.color];
		ctx.lineWidth = scale * 0.25;
		circleFromCenter(ctx, 0, 0, radius, false, true);
		ctx.fillStyle = HEX_COLORS[this.color] + "66"; // <- alpha/opacity
		circleFromCenter(ctx, 0, 0, radius, true, false);
		const img = images.get(this.name);
		if (img) {
			ctx.drawImage(img, -radius, -radius, 2*radius, 2*radius);
		}
		ctx.resetTransform();
	}
}