import { useState } from 'react';
import Welcome from '@/components/Welcome';
import Game from '@/components/Game';
import Results from '@/components/Results';

interface FoundWord {
  word: string;
  score: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'results'>('welcome');
  const [gameResults, setGameResults] = useState<{
    words: FoundWord[];
    totalLetters: number;
    rejectedWords: string[];
  }>({ words: [], totalLetters: 0, rejectedWords: [] });

  const handleStart = () => {
    setGameState('playing');
  };

  const handleGameEnd = (words: FoundWord[], totalLetters: number, rejectedWords: string[]) => {
    setGameResults({ words, totalLetters, rejectedWords });
    setGameState('results');
  };

  const handleRetry = () => {
    setGameResults({ words: [], totalLetters: 0, rejectedWords: [] });
    setGameState('playing');
  };

  return (
    <>
      {gameState === 'welcome' && <Welcome onStart={handleStart} />}
      {gameState === 'playing' && <Game onGameEnd={handleGameEnd} />}
      {gameState === 'results' && (
        <Results
          words={gameResults.words}
          totalLetters={gameResults.totalLetters}
          rejectedWords={gameResults.rejectedWords}
          onRetry={handleRetry}
        />
      )}
    </>
  );
};

export default Index;
