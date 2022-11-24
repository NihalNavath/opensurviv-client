import { RectHitbox, Vec2 } from "../../types/maths";
import { GameObject } from "../../types/objects";
import { Player } from "../entities";

const crateImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
crateImg.onload = () => crateImg.loaded = true;
crateImg.src = "assets/images/game/objects/crate.png";

const crateResidueImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
crateResidueImg.onload = () => crateResidueImg.loaded = true;
crateResidueImg.src = "assets/images/game/objects/residues/crate.png";

export default class Crate extends GameObject {
	type = "crate";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!crateImg.loaded || !crateResidueImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * (<RectHitbox>this.hitbox).width * (this.despawn ? 0.1 : 1), height = width * crateImg.naturalWidth / crateImg.naturalHeight;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.drawImage(this.despawn ? crateResidueImg : crateImg, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
		/*const hitbox = (<RectHitbox> this.hitbox);
		const rectStartingPoint = this.position.addVec(new Vec2(-hitbox.width / 2, -hitbox.height).addAngle(this.direction.angle()));
		const rectPoints = [
			rectStartingPoint,
			rectStartingPoint.addVec(new Vec2(hitbox.width, 0).addAngle(this.direction.angle())),
			rectStartingPoint.addVec(new Vec2(hitbox.width, hitbox.height).addAngle(this.direction.angle())),
			rectStartingPoint.addVec(new Vec2(0, hitbox.height).addAngle(this.direction.angle()))
		];
		for (const point of rectPoints) point.render(you, canvas, ctx, scale, this.position);*/
		
	}
}