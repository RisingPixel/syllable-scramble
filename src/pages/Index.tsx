import { useState, useEffect } from 'react';
import Welcome from '@/components/Welcome';
import Game from '@/components/Game';
import Results from '@/components/Results';
import AdOverlay from '@/components/AdOverlay';
import { getRandomSyllable, isValidSyllableFormat } from '@/data/syllables';
import { useToast } from '@/hooks/use-toast';
import { usePokiSDK } from '@/hooks/usePokiSDK';
import { FoundWord, Achievement } from '@/types/achievements';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const { isSDKReady, isAdPlaying, initializeSDK, gameplayStart, gameplayStop, commercialBreak } = usePokiSDK();
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'results'>('welcome');
  const [challengeSyllable, setChallengeSyllable] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<{
    words: FoundWord[];
    totalLetters: number;
    rejectedWords: string[];
    syllable: string;
    achievements: Achievement[];
  }>({ words: [], totalLetters: 0, rejectedWords: [], syllable: '', achievements: [] });

  useEffect(() => {
    initializeSDK();
  }, [initializeSDK]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const syllableFromUrl = params.get('syl');
    
    if (syllableFromUrl) {
      const isValid = isValidSyllableFormat(syllableFromUrl);
      
      if (isValid) {
        setChallengeSyllable(syllableFromUrl.toUpperCase());
      } else {
        toast({
          title: "Invalid challenge",
          description: "The syllable in the URL is invalid. Starting with a random one.",
          variant: "destructive",
        });
        setChallengeSyllable(getRandomSyllable());
      }
    }
  }, [toast]);

  const handleStart = async () => {
    if (!isSDKReady || isAdPlaying) return;
    
    await commercialBreak();
    setGameState('playing');
  };

  const handleGameEnd = (words: FoundWord[], totalLetters: number, rejectedWords: string[], syllable: string, achievements: Achievement[]) => {
    setGameResults({ words, totalLetters, rejectedWords, syllable, achievements });
    setGameState('results');
  };

  const handleRetry = () => {
    setGameResults({ words: [], totalLetters: 0, rejectedWords: [], syllable: '', achievements: [] });
    setGameState('playing');
  };

  if (!isSDKReady) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-accent" />
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdOverlay isVisible={isAdPlaying} />
      
      {gameState === 'welcome' && (
        <Welcome onStart={handleStart} challengeSyllable={challengeSyllable} />
      )}
      
      {gameState === 'playing' && (
        <Game 
          onGameEnd={handleGameEnd} 
          challengeSyllable={challengeSyllable}
          gameplayStart={gameplayStart}
          gameplayStop={gameplayStop}
          isAdPlaying={isAdPlaying}
        />
      )}
      
      {gameState === 'results' && (
        <Results
          words={gameResults.words}
          totalLetters={gameResults.totalLetters}
          rejectedWords={gameResults.rejectedWords}
          syllable={gameResults.syllable}
          achievements={gameResults.achievements}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default Index;
