import { useState, useRef, useCallback } from 'react';

interface PokiSDKState {
  isSDKReady: boolean;
  isAdPlaying: boolean;
}

export const usePokiSDK = () => {
  const [state, setState] = useState<PokiSDKState>({
    isSDKReady: false,
    isAdPlaying: false,
  });
  
  const isInitializing = useRef(false);
  const isInitialized = useRef(false);

  const initializeSDK = useCallback(async () => {
    if (isInitializing.current || isInitialized.current) {
      return;
    }

    if (!window.PokiSDK) {
      console.warn('⚠️ Poki SDK not found - running in development mode');
      setState({ isSDKReady: true, isAdPlaying: false });
      return;
    }

    try {
      isInitializing.current = true;
      console.log('🎮 Initializing Poki SDK...');
      
      await window.PokiSDK.init();
      
      console.log('✅ Poki SDK successfully initialized');
      window.PokiSDK.gameLoadingFinished();
      
      isInitialized.current = true;
      setState(prev => ({ ...prev, isSDKReady: true }));
    } catch (error) {
      console.error('❌ Poki SDK initialization failed:', error);
      setState(prev => ({ ...prev, isSDKReady: true }));
    } finally {
      isInitializing.current = false;
    }
  }, []);

  const gameplayStart = useCallback(() => {
    if (window.PokiSDK && isInitialized.current) {
      console.log('🎮 Poki: gameplayStart');
      window.PokiSDK.gameplayStart();
    }
  }, []);

  const gameplayStop = useCallback(() => {
    if (window.PokiSDK && isInitialized.current) {
      console.log('⏸️ Poki: gameplayStop');
      window.PokiSDK.gameplayStop();
    }
  }, []);

  const commercialBreak = useCallback(async () => {
    if (!window.PokiSDK || !isInitialized.current) {
      console.log('⚠️ Skipping ad (SDK not available)');
      return;
    }

    try {
      console.log('🎞️ Poki: commercialBreak started');
      
      await window.PokiSDK.commercialBreak({
        adStarted: () => {
          console.log('📺 Ad started');
          setState(prev => ({ ...prev, isAdPlaying: true }));
        },
        adFinished: () => {
          console.log('✅ Ad finished');
          setState(prev => ({ ...prev, isAdPlaying: false }));
        },
      });
      
      console.log('🎞️ Poki: commercialBreak finished');
    } catch (error) {
      console.error('❌ Commercial break error:', error);
      setState(prev => ({ ...prev, isAdPlaying: false }));
    }
  }, []);

  return {
    isSDKReady: state.isSDKReady,
    isAdPlaying: state.isAdPlaying,
    initializeSDK,
    gameplayStart,
    gameplayStop,
    commercialBreak,
  };
};
