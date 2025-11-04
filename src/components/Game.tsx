import { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Timer from "./Timer";
import WordList from "./WordList";
import { validateWord } from "@/utils/validateWord";
import { getRandomSyllable } from "@/data/syllables";
import { calculateScoreWithBreakdown } from "@/utils/scoreCalculator";
import { checkAchievements } from "@/utils/achievements";
import ScorePopup from "./ScorePopup";
import CenteredPopup from "./CenteredPopup";
import { useToast } from "@/hooks/use-toast";
import { FoundWord, ComboState, GameData, ScoreBreakdown, Achievement } from "@/types/achievements";

interface GameProps {
  onGameEnd: (
    words: FoundWord[],
    totalLetters: number,
    rejectedWords: string[],
    syllable: string,
    achievements: Achievement[],
  ) => void;
  challengeSyllable?: string | null;
  gameplayStart: () => void;
  gameplayStop: () => void;
  isAdPlaying: boolean;
}

const Game = ({ onGameEnd, challengeSyllable, gameplayStart, gameplayStop, isAdPlaying }: GameProps) => {
  const { toast } = useToast();
  const [syllable] = useState(challengeSyllable || getRandomSyllable());
  const [inputValue, setInputValue] = useState("");
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [rejectedWords, setRejectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [comboState, setComboState] = useState<ComboState>({
    count: 0,
    multiplier: 1,
    lastSubmitTime: null,
  });
  const [scorePopup, setScorePopup] = useState<ScoreBreakdown | null>(null);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    gameplayStart();
    inputRef.current?.focus();
    
    return () => {
      gameplayStop();
    };
  }, [gameplayStart, gameplayStop]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        handleTimeUp();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUp = () => {
    gameplayStop();
    
    const totalLetters = foundWords.reduce((sum, w) => sum + w.word.length, 0);
    const allAchievements = Array.from(unlockedAchievements)
      .map((id) =>
        checkAchievements(
          {
            foundWords,
            rejectedWords,
            timeLeft,
            syllable,
            totalScore: foundWords.reduce((sum, w) => sum + w.score, 0),
            comboCount: comboState.count,
          },
          new Set(),
        ).find((a) => a.id === id),
      )
      .filter((a): a is Achievement => a !== undefined);

    onGameEnd(foundWords, totalLetters, rejectedWords, syllable, allAchievements);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isAdPlaying) return;

    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Check if word already found
    if (foundWords.some((w) => w.word.toLowerCase() === trimmedInput.toLowerCase())) {
      setErrorPopup("Already found!");
      setInputValue("");
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }

    // Validate word
    const validation = await validateWord(trimmedInput, syllable);
    const now = Date.now();
    const timestamp = now - startTimeRef.current;

    if (validation.valid) {
      // Combo logic
      let newCombo = { ...comboState };

      if (comboState.lastSubmitTime && now - comboState.lastSubmitTime < 5000) {
        // Word found within 5 seconds → Combo!
        newCombo.count++;
        newCombo.multiplier = Math.min(1 + Math.floor(newCombo.count / 2) * 0.5, 5);
      } else {
        // Too much time → Reset combo
        newCombo.count = 1;
        newCombo.multiplier = 1;
      }

      newCombo.lastSubmitTime = now;
      setComboState(newCombo);

      // Calculate score with breakdown
      const breakdown = calculateScoreWithBreakdown(trimmedInput, syllable, newCombo.multiplier);

      // Show score popup
      setScorePopup(breakdown);

      // Add word with all data
      const newWord: FoundWord = {
        word: trimmedInput.toUpperCase(),
        score: breakdown.total,
        baseScore: breakdown.base,
        comboMultiplier: newCombo.multiplier > 1 ? newCombo.multiplier : undefined,
        timestamp,
        bonuses: breakdown.bonuses,
      };

      const updatedWords = [...foundWords, newWord];
      setFoundWords(updatedWords);

      // Check for achievements
      const gameData: GameData = {
        foundWords: updatedWords,
        rejectedWords,
        timeLeft,
        syllable,
        totalScore: updatedWords.reduce((sum, w) => sum + w.score, 0),
        comboCount: newCombo.count,
      };

      const newlyUnlocked = checkAchievements(gameData, unlockedAchievements);
      if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((achievement) => {
          toast({
            title: `🎉 ${achievement.name}`,
            description: `${achievement.description} (+${achievement.points} pts)`,
            duration: 4000,
          });
        });
        // Simplified achievement unlocking
        setUnlockedAchievements((prev) => new Set([...prev, ...newlyUnlocked.map((a) => a.id)]));
      }

      setInputValue("");
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Error → Reset combo
      setComboState({ count: 0, multiplier: 1, lastSubmitTime: null });

      // Add to rejected words if not already there
      if (!rejectedWords.includes(trimmedInput.toUpperCase())) {
        setRejectedWords([...rejectedWords, trimmedInput.toUpperCase()]);
      }

      // Inline error message mapping
      const errorMessage = 
        validation.errorType === 'too_short' ? "Too short!" :
        validation.errorType === 'missing_syllable' ? `Must contain "${syllable.toUpperCase()}"!` :
        validation.errorType === 'not_in_dictionary' ? "Word not found!" : "Error!";

      setErrorPopup(errorMessage);
      setInputValue("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const totalScore = foundWords.reduce((sum, w) => sum + w.score, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-background">
      {/* Score Popup */}
      {scorePopup && <ScorePopup breakdown={scorePopup} onComplete={() => setScorePopup(null)} />}
      
      {/* Error Popup */}
      {errorPopup && (
        <CenteredPopup duration={1500} type="error" onComplete={() => setErrorPopup(null)}>
          <div className="bg-destructive text-white font-bold px-4 py-2 rounded-lg shadow-[0_0_0_3px_white,0_0_0_5px_rgb(239,68,68)]">
            {errorPopup}
          </div>
        </CenteredPopup>
      )}

      {/* Portrait Layout */}
      <div className="w-full max-w-2xl space-y-4 sm:space-y-8 animate-scale-in landscape:hidden">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">SYLLABLE</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Find words containing the syllable</p>
        </div>

        {/* Timer and Score */}
        <div className="flex justify-between items-center px-4">
          <div className="text-xl sm:text-2xl font-bold">
            Score: <span className="text-accent">{totalScore}</span>
          </div>
          <Timer timeLeft={timeLeft} />
        </div>

        {/* Syllable Display */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider">Find words with</p>
          <div className="text-4xl sm:text-6xl font-bold tracking-wider bg-secondary px-4 sm:px-6 py-3 sm:py-4 rounded-xl inline-block">
            {syllable}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a word..."
            className="text-xl sm:text-2xl py-4 sm:py-6 px-4 sm:px-6 bg-card border-2 border-border focus:border-accent uppercase text-center tracking-wide"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg sm:text-xl py-5 sm:py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all"
          >
            Submit
          </Button>
        </form>

        {/* Word List */}
        <WordList words={foundWords} syllable={syllable} />
      </div>

      {/* Landscape Layout */}
      <div className="hidden landscape:flex landscape:flex-col w-full h-screen overflow-hidden animate-scale-in p-2 gap-2">
        {/* Riga superiore: Score + SYLLABLE + Timer */}
        <div className="grid grid-cols-3 items-center px-2">
          {/* Score a sinistra */}
          <div className="text-base font-bold">
            Score: <span className="text-accent">{totalScore}</span>
          </div>
          
          {/* SYLLABLE al centro */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">SYLLABLE</h1>
            <p className="text-[10px] text-muted-foreground">Find words with the syllable</p>
          </div>
          
          {/* Timer a destra */}
          <div className="flex justify-end">
            <Timer timeLeft={timeLeft} />
          </div>
        </div>

        {/* Due colonne con altezza fissa per evitare scroll */}
        <div className="grid grid-cols-2 gap-2 overflow-hidden h-[60vh]">
          {/* Card TARGET - sinistra */}
          <div className="bg-card border border-border rounded-lg p-3 flex flex-col items-center justify-center h-full">
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">TARGET</p>
            <div className="text-3xl font-bold tracking-wider bg-secondary px-4 py-2 rounded-lg">
              {syllable}
            </div>
          </div>
          
          {/* Card FOUND WORDS - destra */}
          <div className="bg-card border border-border rounded-lg p-3 flex flex-col h-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">FOUND WORDS</p>
              <p className="text-[10px] text-muted-foreground">{foundWords.length} words</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <WordList words={foundWords} syllable={syllable} isLandscape hideHeader />
            </div>
          </div>
        </div>

        {/* Form in basso */}
        <form onSubmit={handleSubmit} className="space-y-1 w-full">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="TYPE A WORD..."
            className="text-base py-2 px-3 bg-card border-2 border-border focus:border-accent uppercase text-center tracking-wide w-full"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <Button
            type="submit"
            size="lg"
            className="w-full text-sm py-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Game;
