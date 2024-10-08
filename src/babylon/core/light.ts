import * as BABYLON from "@babylonjs/core";

let light: BABYLON.HemisphericLight;

export function setLight(scene: BABYLON.Scene) {
  light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 10, 0),
    scene
  );
  light.intensity = 0.7;
}

export function getLight() {
  return light;
}
