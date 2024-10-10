import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

let gui: GUI.AdvancedDynamicTexture;

export function setGUI(scene: BABYLON.Scene) {
  gui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
}

export function getGUI() {
  return gui;
}
