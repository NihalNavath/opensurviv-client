import { ENTITY_SUPPLIERS } from ".";
import { Entity } from "../../types/entity";
import { MinEntity } from "../../types/minimized";
import { EntitySupplier } from "../../types/supplier";
import { circleFromCenter } from "../../utils";
import Player from "./player";

const images = new Map<string, HTMLImageElement & { loaded: boolean }>();

interface AdditionalEntity {
	name: string;
}

class GrenadeSupplier implements EntitySupplier {
	create(minEntity: MinEntity & AdditionalEntity) {
		return new Grenade(minEntity);
	}
}

export default class Grenade extends Entity {
	static readonly TYPE = "grenade";
	type = Grenade.TYPE;
	// Used for rendering Grenade size
	name!: string;

	constructor(minEntity: MinEntity & AdditionalEntity) {
		super(minEntity);
		this.copy(minEntity);
	}

	static {
		ENTITY_SUPPLIERS.set(Grenade.TYPE, new GrenadeSupplier());
	}

	copy(minEntity: MinEntity & AdditionalEntity) {
		super.copy(minEntity);
		this.name = minEntity.name;
	}

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		const relative = this.position.addVec(you.position.inverse());
		const radius = scale * this.hitbox.comparable;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.strokeStyle = "#000";
		ctx.lineWidth = scale * 0.1;
		circleFromCenter(ctx, 0, 0, radius, false, true);
		ctx.fillStyle = "#00000066"; // <- alpha/opacity
		circleFromCenter(ctx, 0, 0, radius, true, false);
		const img = images.get(this.name);
		if (img) {
			ctx.drawImage(img, -radius, -radius, 2*radius, 2*radius);
		}
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#fff";
		ctx.font = `${canvas.height / 54}px Arial`;
		ctx.fillText(this.name, 0, 0);
		ctx.resetTransform();
	}
}