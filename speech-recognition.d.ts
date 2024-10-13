// speech-recognition.d.ts
interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionErrorEvent {
    error: string;
  }
  
  // Puedes agregar más definiciones si es necesario
  