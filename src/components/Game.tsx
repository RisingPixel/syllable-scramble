import { useState, useEffect, useRef, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Timer from './Timer';
import WordList from './WordList';
import { validateWord, calculateScore, getRandomSyllable } from '@/utils/validateWord';

interface FoundWord {
  word: string;
  score: number;
}

interface GameProps {
  onGameEnd: (words: FoundWord[], totalLetters: number, rejectedWords: string[]) => void;
}

const Game = ({ onGameEnd }: GameProps) => {
  const [syllable] = useState(getRandomSyllable());
  const [inputValue, setInputValue] = useState('');
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [rejectedWords, setRejectedWords] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleTimeUp = () => {
    const totalLetters = foundWords.reduce((sum, w) => sum + w.word.length, 0);
    onGameEnd(foundWords, totalLetters, rejectedWords);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Check if word already found
    if (foundWords.some(w => w.word.toLowerCase() === trimmedInput.toLowerCase())) {
      setErrorMessage('Already found!');
      setTimeout(() => setErrorMessage(''), 1500);
      setInputValue('');
      return;
    }

    // Validate word
    const isValid = await validateWord(trimmedInput, syllable);
    if (isValid) {
      const score = calculateScore(trimmedInput);
      setFoundWords([...foundWords, { word: trimmedInput.toUpperCase(), score }]);
      setInputValue('');
      setErrorMessage('');
    } else {
      // Add to rejected words if not already there
      if (!rejectedWords.includes(trimmedInput.toUpperCase())) {
        setRejectedWords([...rejectedWords, trimmedInput.toUpperCase()]);
      }
      setErrorMessage('Invalid word!');
      setTimeout(() => setErrorMessage(''), 1500);
      setInputValue('');
    }
  };

  const totalScore = foundWords.reduce((sum, w) => sum + w.score, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
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
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
            Find words with
          </p>
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
              <div className="absolute -bottom-8 left-0 right-0 text-center text-destructive font-medium animate-fade-in">
                {errorMessage}
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
