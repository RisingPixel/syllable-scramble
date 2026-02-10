import { useState, useEffect } from "react";
import { isValidSyllableFormat } from "../data/syllables";
import { PlayerProgress, loadPlayerProgress, addGameResults } from "../utils/playerProgress";
import Welcome from "../components/Welcome";
import Game from "../components/Game";
import Results from "../components/Results";
import { FoundWord, Achievement } from "../types/achievements";
import { InitResponse } from '../../../shared/types/api';

type GameState = "welcome" | "playing" | "results";

interface GameResult {
  words: FoundWord[];
  totalLetters: number;
  rejectedWords: string[];
  syllable: string;
  achievements: Achievement[];
}

export default function Index() {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>(() => loadPlayerProgress());
  const [challengeSyllable, setChallengeSyllable] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    const init = async() => {
      try {
        // Call API (fail if not 200 OK result)
        const res = await fetch('/api/init');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        // Get json from result (error if not correct)
        const data: InitResponse = await res.json();
        if (data.type !== 'init') {
          throw new Error('Unexpected response');
        }

        // Update syllable with game data from back-end
        setChallengeSyllable(data.syllable.toUpperCase())
      } catch (err) {
        console.error('Failed to init counter', err);
      }
    };

    // Call async method defined above
    void init();
  }, []);

  // Check for challenge syllable in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sylParam = params.get("syl");
    
    if (sylParam && isValidSyllableFormat(sylParam)) {
      setChallengeSyllable(sylParam.toUpperCase());
    }
  }, []);

  // Subscribe to player progress updates from other game results
  useEffect(() => {
    const handleStorageChange = () => {
      setPlayerProgress(loadPlayerProgress());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleGameEnd = (words: FoundWord[], totalLetters: number, rejectedWords: string[], syllable: string, achievements: Achievement[]) => {
    const result = {
      words,
      totalLetters,
      rejectedWords,
      syllable,
      achievements,
    };
    setGameResult(result);
    
    // Update player progress
    const finalScore = words.reduce((sum, w) => sum + w.score, 0) + achievements.reduce((sum, a) => sum + a.points, 0);
    addGameResults(finalScore, words.length);
    setPlayerProgress(loadPlayerProgress());
    
    setGameState("results");
  };

  const handleBackToMenu = () => {
    setGameState("welcome");
    // setChallengeSyllable(null);
    setGameResult(null);
    // Reload player progress in case it was updated elsewhere
    setPlayerProgress(loadPlayerProgress());
  };

  return (
    <>
      {gameState === "welcome" && (
        <Welcome
          onStart={handleStartGame}
          challengeSyllable={challengeSyllable}
          playerProgress={playerProgress}
        />
      )}

      {gameState === "playing" && (
        <Game
          onGameEnd={handleGameEnd}
          gameplayStart={() => {}}
          gameplayStop={() => {}}
          isAdPlaying={false}
          challengeSyllable={challengeSyllable}
        />
      )}

      {gameState === "results" && gameResult && (
        <Results
          words={gameResult.words}
          totalLetters={gameResult.totalLetters}
          rejectedWords={gameResult.rejectedWords}
          syllable={gameResult.syllable}
          onBackToMenu={handleBackToMenu}
          achievements={gameResult.achievements}
        />
      )}
    </>
  );
}
