import { RectHitbox } from "../../types/math";
import { Obstacle } from "../../types/obstacle";
import { Player } from "../entities";

const crateImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
crateImg.onload = () => crateImg.loaded = true;
crateImg.src = "assets/images/game/objects/crate.svg";

const crateResidueImg: HTMLImageElement & { loaded: boolean } = Object.assign(new Image(), { loaded: false });
crateResidueImg.onload = () => crateResidueImg.loaded = true;
crateResidueImg.src = "assets/images/game/objects/residues/crate.svg";

export default class Crate extends Obstacle {
	type = "crate";

	render(you: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		if (!crateImg.loaded || !crateResidueImg.loaded) return;
		const relative = this.position.addVec(you.position.inverse());
		const width = scale * (<RectHitbox>this.hitbox).width * (this.despawn ? 0.5 : 1), height = width * crateImg.naturalWidth / crateImg.naturalHeight;
		ctx.translate(canvas.width / 2 + relative.x * scale, canvas.height / 2 + relative.y * scale);
		ctx.rotate(-this.direction.angle());
		ctx.drawImage(this.despawn ? crateResidueImg : crateImg, -width / 2, -height / 2, width, height);
		ctx.resetTransform();
	}

	renderMap(_canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scale: number) {
		ctx.translate(this.position.x * scale, this.position.y * scale);
		ctx.fillStyle = "#683c05";
		ctx.fillRect(-2 * scale, -2 * scale, 4 * scale, 4 * scale);
		ctx.resetTransform();
	}
}