import { DEFINED_ANIMATIONS } from ".";
import { DefinedAnimation } from "../../types/animation";
import { Vec2 } from "../../types/math";

const LEFT_FIST = new DefinedAnimation(
	"left_fist",
	[new Vec2(0, -1), Vec2.ONE, new Vec2(0, -1)],
	Array(3).fill(Vec2.ONE),
	[0, 0.5, 1],
	500
);

const RIGHT_FIST = new DefinedAnimation(
	"right_fist",
	[new Vec2(0, 1), Vec2.ONE, new Vec2(0, 1)],
	Array(3).fill(Vec2.ONE),
	[0, 0.5, 1],
	500
);

export default function init() {
	DEFINED_ANIMATIONS.set(LEFT_FIST.id, LEFT_FIST);
	DEFINED_ANIMATIONS.set(RIGHT_FIST.id, RIGHT_FIST);
}