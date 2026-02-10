declare global {
  interface Window {
    PokiSDK?: {
      init(): Promise<void>;
      gameLoadingFinished(): void;
      gameplayStart(): void;
      gameplayStop(): void;
      commercialBreak(callbacks: {
        adStarted: () => void;
        adFinished: () => void;
      }): Promise<void>;
    };
  }
}

export {};
