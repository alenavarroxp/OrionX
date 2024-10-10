import * as GUI from "@babylonjs/gui";
import { getAssistant } from "../entity/assistant";
import { getGUI } from "./gui";

let stackPanel: GUI.StackPanel | null = null; // Variable para almacenar el StackPanel
let dotsInterval: NodeJS.Timeout | null = null; // Guardar el intervalo para detenerlo después

// Función para mostrar los puntos suspensivos de forma indefinida
export function setTalkDots() {
  const gui = getGUI();

  // Obtener el asistente/robot y su posición
  const assistant = getAssistant(); // Supongo que assistant tiene una propiedad position
  if (!assistant) return;

  // Crear un contenedor stack panel para organizar los puntos
  stackPanel = new GUI.StackPanel();
  stackPanel.isVertical = false; // Para alinear los puntos horizontalmente
  stackPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  stackPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

  stackPanel.top = 0;
  stackPanel.left = 0;

  gui.addControl(stackPanel);

  // Crear los puntos como elipses grandes y redondeadas
  const circles: GUI.Ellipse[] = [];
  for (let i = 0; i < 3; i++) {
    const circle = new GUI.Ellipse();
    circle.width = "20px"; // Ancho del círculo
    circle.height = "20px"; // Alto del círculo
    circle.color = "white"; // Borde blanco
    circle.thickness = 2; // Grosor del borde
    circle.background = "white"; // Relleno blanco

    circle.paddingLeft = "5px"; // Agregar margen a los lados
    circle.paddingRight = "5px";
    circle.paddingBottom = "5px";
    circle.paddingTop = "5px";

    stackPanel.addControl(circle);
    circles.push(circle); // Guardamos los círculos para la animación
  }

  // Animación de los puntos suspensivos
  let dotCount = 0;
  dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // Ciclo entre 0, 1, 2, 3

    // Ocultar o mostrar puntos dependiendo del valor actual
    for (let i = 0; i < circles.length; i++) {
      circles[i].isVisible = i < dotCount;
    }
  }, 250); // Cambiar cada 250ms
}

// Función para eliminar los puntos suspensivos
export function destroyTalkDots() {
  if (dotsInterval) {
    clearInterval(dotsInterval); // Detener la animación
    dotsInterval = null;
  }

  if (stackPanel) {
    stackPanel.dispose(); // Destruir el StackPanel y sus controles
    stackPanel = null; // Limpiar la referencia
  }
}
