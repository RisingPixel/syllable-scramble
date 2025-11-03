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
}

const Game = ({ onGameEnd, challengeSyllable }: GameProps) => {
  const { toast } = useToast();
  const [syllable] = useState(challengeSyllable || getRandomSyllable());
  const [inputValue, setInputValue] = useState("");
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [rejectedWords, setRejectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");
  const [comboState, setComboState] = useState<ComboState>({
    count: 0,
    multiplier: 1,
    lastSubmitTime: null,
  });
  const [scorePopup, setScorePopup] = useState<ScoreBreakdown | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUp = () => {
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

    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Check if word already found
    if (foundWords.some((w) => w.word.toLowerCase() === trimmedInput.toLowerCase())) {
      setErrorMessage("Already found!");
      setTimeout(() => setErrorMessage(""), 1500);
      setInputValue("");
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
        setUnlockedAchievements((prev) => {
          const updated = new Set(prev);
          newlyUnlocked.forEach((a) => updated.add(a.id));
          return updated;
        });
      }

      setInputValue("");
      setErrorMessage("");
    } else {
      // Error → Reset combo
      setComboState({ count: 0, multiplier: 1, lastSubmitTime: null });

      // Add to rejected words if not already there
      if (!rejectedWords.includes(trimmedInput.toUpperCase())) {
        setRejectedWords([...rejectedWords, trimmedInput.toUpperCase()]);
      }

      // Set specific error message based on error type
      const errorMessages = {
        too_short: "Troppo corta!",
        missing_syllable: `Deve contenere "${syllable.toUpperCase()}"!`,
        not_in_dictionary: "Parola non trovata!",
      };

      setErrorMessage(errorMessages[validation.errorType!] || "Errore!");
      setTimeout(() => setErrorMessage(""), 1500);
      setInputValue("");
    }
  };

  const totalScore = foundWords.reduce((sum, w) => sum + w.score, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      {/* Score Popup */}
      {scorePopup && <ScorePopup breakdown={scorePopup} onComplete={() => setScorePopup(null)} />}

      <div className="w-full max-w-2xl space-y-8 animate-scale-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-2">SYLLABLE</h1>
          <p className="text-muted-foreground">Find words containing the syllable</p>
        </div>

        {/* Timer and Score */}
        <div className="flex justify-between items-center px-4">
          <div className="text-2xl font-bold">
            Score: <span className="text-accent">{totalScore}</span>
          </div>
          <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
        </div>

        {/* Syllable Display */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">Find words with</p>
          <div className="text-6xl font-bold tracking-wider bg-secondary px-6 py-4 rounded-xl inline-block">
            {syllable}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a word..."
              className="text-2xl py-6 px-6 bg-card border-2 border-border focus:border-accent uppercase text-center tracking-wide"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {errorMessage && (
              <div className="absolute -bottom-8 left-0 right-0 text-center animate-fade-in">
                <span className="inline-block bg-destructive text-white font-bold px-4 py-2 rounded-lg shadow-[0_0_0_3px_white,0_0_0_5px_rgb(239,68,68)]">
                  {errorMessage}
                </span>
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full text-xl py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all"
          >
            Submit
          </Button>
        </form>

        {/* Word List */}
        <WordList words={foundWords} syllable={syllable} />
      </div>
    </div>
  );
};

export default Game;
