// src/react-speech-recognition.d.ts
declare module 'react-speech-recognition' {
  export interface ListeningOptions {
    continuous?: boolean;
    language?: string;
  }

  export function useSpeechRecognition(): {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    resetTranscript: () => void;
    listening: boolean;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  };

  export function startListening(options?: ListeningOptions): void;
  export function stopListening(): void;
  export function abortListening(): void;
}
