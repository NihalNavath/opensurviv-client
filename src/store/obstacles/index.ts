import { CircleHitbox, Vec2 } from "../../types/math";
import { MinObstacle, MinMinObstacle } from "../../types/minimized";
import { DummyObstacle } from "../../types/obstacle";
import Bush from "./bush";
import Crate from "./crate";
import Stone from "./stone";
import Tree from "./tree";
import mosin_Tree from "./mosin_tree";
import soviet_Crate from "./soviet_crate";

export { default as Tree } from "./tree";
export { default as Bush } from "./bush";
export { default as Crate } from "./crate";
export { default as mosin_Tree} from "./mosin_tree";
export { default as Stone } from "./stone";
export { default as soviet_Crate} from "./soviet_crate";

// This still need hard-coding unfortunately
export function castCorrectObstacle(minObstacle: MinObstacle & any) {
	switch (minObstacle.type) {
		case "tree":
			return new Tree(minObstacle);
		case "bush":
			return new Bush(minObstacle);
		case "crate":
			return new Crate(minObstacle);
		case "stone":
			return new Stone(minObstacle);
		case "mosin_tree":
			return new mosin_Tree(minObstacle);
		case "soviet_crate":
			return new soviet_Crate(minObstacle);
		default:
			return new DummyObstacle(minObstacle);
	}
}

export function castMinObstacle(minMinObstacle: MinMinObstacle & any) {
	const copy = minMinObstacle;
	return Object.assign(copy, { direction: Vec2.ONE, hitbox: new CircleHitbox(0), despawn: false });
}