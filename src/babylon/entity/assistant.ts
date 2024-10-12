import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { setCameraTarget } from "../core/camera";

let assistant: BABYLON.AbstractMesh | null = null;
let animationGroups: BABYLON.AnimationGroup[] = [];
let idleAnimation: BABYLON.AnimationGroup | null = null;

// Cargar las animaciones del asistente
export function setAssistant(scene: BABYLON.Scene) {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "models/",
    "assistant.glb",
    scene,
    (meshes, _particleSystems, _skeletons, loadedAnimationGroups) => {
      assistant = meshes[0];

      // Escalar el asistente
      assistantScale();

      // Guardar las animaciones cargadas
      loadAssistantAnimations(loadedAnimationGroups);

      // Reproducir la animación "WELCOME" una sola vez
      playAnimationOnce("Character|WELCOME", () => {
        // Cuando la animación termine, cambiar a la animación "IDLE"
        setIdleAnimation();
      });

      setCameraTarget([
        new BABYLON.Vector3(
          assistant.position.x,
          assistant.position.y + 1,
          assistant.position.z
        ),
      ]);
    },
    null,
    (_, message) => {
      console.error("Error loading model:", message);
    }
  );
}

export function getAssistant() {
  return assistant;
}

// Función para escalar el asistente
function assistantScale() {
  if (assistant) {
    assistant.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
  }
}

// Función para cargar y almacenar las animaciones
function loadAssistantAnimations(
  loadedAnimationGroups: BABYLON.AnimationGroup[]
) {
  animationGroups = loadedAnimationGroups;

  // Buscar y guardar las animaciones específicas
  idleAnimation =
    animationGroups.find((group) => group.name === "Character|IDLE") || null;
}

// Función para reproducir una animación una vez
function playAnimationOnce(animationName: string, onComplete: () => void) {
  const animation = animationGroups.find(
    (group) => group.name === animationName
  );

  if (animation) {
    // Asegurarse de que no se reproduzca en bucle
    animation.loopAnimation = false;

    // Reproducir la animación una sola vez
    animation.reset();
    animation.play(false); // false para que solo se reproduzca una vez

    // Escuchar el evento de finalización de la animación
    animation.onAnimationEndObservable.addOnce(() => {
      onComplete();
    });
  } else {
    console.error(`Animation ${animationName} not found.`);
  }
}

// Función para pausar cualquier animación actual
export function stopAnimation() {
  animationGroups.forEach((group) => group.pause());
  idleAnimation?.pause();
}

// Función para establecer la animación "IDLE"
function setIdleAnimation() {
  if (idleAnimation) {
    idleAnimation.reset();
    idleAnimation.play(true); // true para que se repita en bucle
  } else {
    console.error("Idle animation not found.");
  }
}

export function setAnimation(name: string) {
  const animation = animationGroups.find((group) => group.name === name);

  stopAnimation();

  if (animation) {
    animation.play(false); // Reproduce la animación especificada

    // Una vez que la animación ha terminado, inicia la animación idle
    animation.onAnimationEndObservable.addOnce(() => {
      // Reproducir la animación de idle
      if (idleAnimation) {
        idleAnimation.reset();
        idleAnimation.play(true); // true para que se repita en bucle
      } else {
        console.error("Idle animation not found.");
      }
    });
  } else {
    console.error(`Animation ${name} not found.`);
  }
}
