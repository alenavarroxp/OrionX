import * as BABYLON from "@babylonjs/core";

let camera: BABYLON.ArcRotateCamera;

export function setCamera(scene: BABYLON.Scene) {
  camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / Math.PI + 0.3,
    7,
    BABYLON.Vector3.Zero(),
    scene
  );
}

export function getCamera() {
  return camera;
}

export function setCameraTarget(targetPosition: BABYLON.Vector3[]) {
  camera.setTarget(
    new BABYLON.Vector3(
      targetPosition[0].x,
      targetPosition[0].y + 0.25,
      targetPosition[0].z
    )
  );
}
