import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { setCameraTarget } from "../core/camera";

let assistant: BABYLON.AbstractMesh[] | null = null;

export function setAssistant(scene: BABYLON.Scene) {
  // Importar modelo
  BABYLON.SceneLoader.ImportMesh(
    "",
    "models/",
    "assistant.glb",
    scene,
    (meshes) => {
      assistant = meshes;

      assistantScale();
      setCameraTarget(assistant.map((mesh) => mesh.position));
    },
    null, // callback de progreso opcional
    (_, message) => {
      console.error("Error loading model:", message);
    }
  );
}

function assistantScale() {
  if (assistant) {
    assistant.forEach((mesh) => {
      mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    });
  }
}
