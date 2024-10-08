import * as BABYLON from "@babylonjs/core";
import { setScene } from "./scene";

let engine: BABYLON.Engine;

export function setEngine(canvasId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  engine = new BABYLON.Engine(canvas, true);

  setScene(engine);

  window.addEventListener("resize", function () {
    engine.resize();
  });
}

export function getEngine() {
  return engine;
}
