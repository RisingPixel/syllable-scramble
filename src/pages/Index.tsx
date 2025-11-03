import { useState, useEffect } from 'react';
import Welcome from '@/components/Welcome';
import Game from '@/components/Game';
import Results from '@/components/Results';
import { getRandomSyllable } from '@/data/syllables';
import { useToast } from '@/hooks/use-toast';
import { FoundWord, Achievement } from '@/types/achievements';

const Index = () => {
  const { toast } = useToast();
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
    const params = new URLSearchParams(window.location.search);
    const syllableFromUrl = params.get('syl');
    
    if (syllableFromUrl) {
      const isValid = syllableFromUrl && syllableFromUrl.length >= 2 && syllableFromUrl.length <= 4 && /^[a-zA-Z]+$/.test(syllableFromUrl);
      
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

  const handleStart = () => {
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
          achievements={gameResults.achievements}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default Index;
