import { useState, useEffect } from 'react';
import Welcome from '@/components/Welcome';
import Game from '@/components/Game';
import Results from '@/components/Results';
import { getSyllableFromUrl, validateSyllableParam } from '@/utils/urlParams';
import { getRandomSyllable } from '@/utils/validateWord';
import { useToast } from '@/hooks/use-toast';

interface FoundWord {
  word: string;
  score: number;
}

const Index = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'results'>('welcome');
  const [challengeSyllable, setChallengeSyllable] = useState<string | null>(null);
  const [gameResults, setGameResults] = useState<{
    words: FoundWord[];
    totalLetters: number;
    rejectedWords: string[];
    syllable: string;
  }>({ words: [], totalLetters: 0, rejectedWords: [], syllable: '' });

  useEffect(() => {
    const syllableFromUrl = getSyllableFromUrl();
    if (syllableFromUrl) {
      if (validateSyllableParam(syllableFromUrl)) {
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

  const handleStart = () => {
    setGameState('playing');
  };

  const handleGameEnd = (words: FoundWord[], totalLetters: number, rejectedWords: string[], syllable: string) => {
    setGameResults({ words, totalLetters, rejectedWords, syllable });
    setGameState('results');
  };

  const handleRetry = () => {
    setGameResults({ words: [], totalLetters: 0, rejectedWords: [], syllable: '' });
    setGameState('playing');
  };

  return (
    <>
      {gameState === 'welcome' && <Welcome onStart={handleStart} challengeSyllable={challengeSyllable} />}
      {gameState === 'playing' && <Game onGameEnd={handleGameEnd} challengeSyllable={challengeSyllable} />}
      {gameState === 'results' && (
        <Results
          words={gameResults.words}
          totalLetters={gameResults.totalLetters}
          rejectedWords={gameResults.rejectedWords}
          syllable={gameResults.syllable}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default Index;
