export function orionXTalk(
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>
  ) {
    let i = 0;
    const speed = 7.5; // Velocidad del typing effect en milisegundos
  
    // Iniciar la escritura del nuevo mensaje
    const typingEffect = setInterval(() => {
      setText(text.slice(0, i + 1)); // Actualizar el texto hasta el carácter i
      i++;
  
      if (i >= text.length) {
        clearInterval(typingEffect); // Detener el intervalo cuando termine
      }
    }, speed);
  }
  