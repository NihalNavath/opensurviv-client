// This file records the state of things

import { KeyBind } from "./constants";

const keyPressed = new Map<string, boolean>();
export function isKeyPressed(key: KeyBind | string) { return !!keyPressed.get(key); }
export function addKeyPressed(key: KeyBind | string) { keyPressed.set(key, true); }
export function removeKeyPressed(key: KeyBind | string) { keyPressed.delete(key); }
const mousePressed = new Map<number, boolean>();
export function isMousePressed(button: number) { return !!mousePressed.get(button); }
export function addMousePressed(button: number) { mousePressed.set(button, true); }
export function removeMousePressed(button: number) { mousePressed.delete(button); }

var menuHidden = true;
export function isMenuHidden() { return menuHidden; }
export function toggleMenu() { menuHidden = !menuHidden; }

var hudHidden = false;
export function isHudHidden() { return hudHidden; }
export function toggleHud() { hudHidden = !hudHidden; }

var mapOpened = false;
export function isMapOpened() { return mapOpened; }
export function toggleMap() { mapOpened = !mapOpened; }