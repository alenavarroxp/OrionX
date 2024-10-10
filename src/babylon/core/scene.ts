import * as BABYLON from "@babylonjs/core";
import { setAssistant } from "../entity/assistant";
import { setGUI } from "../interface/gui";
import { setCamera } from "./camera";
import { setLight } from "./light";

let scene: BABYLON.Scene;

export function setScene(engine: BABYLON.Engine) {
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  setCamera(scene);
  setLight(scene);
  setAssistant(scene);
  setGUI(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
}

export function getScene() {
  return scene;
}
