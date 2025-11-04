import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FoundWord {
  word: string;
  score: number;
  comboMultiplier?: number;
}

interface WordListProps {
  words: FoundWord[];
  syllable: string;
  isLandscape?: boolean;
}

const WordList = ({ words, syllable, isLandscape = false }: WordListProps) => {
  const [showScore, setShowScore] = useState<string | null>(null);

  useEffect(() => {
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      setShowScore(lastWord.word);
      const timer = setTimeout(() => setShowScore(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [words]);

  const highlightSyllable = (word: string) => {
    const syllableIndex = word.toLowerCase().indexOf(syllable.toLowerCase());
    if (syllableIndex === -1) return word;

    const before = word.slice(0, syllableIndex);
    const match = word.slice(syllableIndex, syllableIndex + syllable.length);
    const after = word.slice(syllableIndex + syllable.length);

    return (
      <>
        {before}
        <span className="bg-accent/30 px-0.5 rounded">{match}</span>
        {after}
      </>
    );
  };

  const getWordColorClass = (word: string): string => {
    const length = word.length;
    if (length <= 3) return 'text-muted-foreground';
    if (length === 4) return 'text-foreground';
    if (length === 5) return 'text-blue-400';
    if (length === 6) return 'text-green-400';
    if (length === 7) return 'text-purple-400';
    if (length === 8) return 'text-orange-400';
    if (length >= 9) return 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400';
    return 'text-foreground';
  };

  const getWordGlowClass = (word: string): string => {
    if (word.length >= 9) return 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]';
    if (word.length >= 7) return 'drop-shadow-[0_0_4px_rgba(168,85,247,0.4)]';
    return '';
  };

  return (
    <div className={cn("w-full space-y-2", isLandscape ? "" : "max-w-md")}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={cn(
          "font-medium text-muted-foreground uppercase tracking-wider",
          isLandscape ? "text-xs" : "text-sm"
        )}>
          Found Words
        </h3>
        <span className={cn(
          "text-muted-foreground",
          isLandscape ? "text-xs" : "text-sm"
        )}>
          {words.length} {words.length === 1 ? 'word' : 'words'}
        </span>
      </div>
      <div className={cn(
        "overflow-y-auto space-y-1 bg-card rounded-lg p-3 border border-border",
        isLandscape ? "max-h-[70vh]" : "max-h-48"
      )}>
        {words.length === 0 ? (
          <p className={cn(
            "text-muted-foreground text-center py-4",
            isLandscape ? "text-sm" : ""
          )}>
            Start typing to find words...
          </p>
        ) : (
          words.map((item, index) => (
            <div
              key={`${item.word}-${index}`}
              className={cn(
                "flex justify-between items-center animate-slide-up",
                isLandscape ? "text-base" : "text-lg"
              )}
            >
              <span className={cn(
                "uppercase font-medium transition-all",
                getWordColorClass(item.word),
                getWordGlowClass(item.word)
              )}>
                {highlightSyllable(item.word)}
              </span>
              {showScore === item.word && (
                <span className={cn(
                  "font-bold animate-fade-in px-2 py-1 rounded-md",
                  item.score >= 100 ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" :
                  item.score >= 60 ? "bg-purple-500/20 text-purple-400" :
                  "bg-green-500/20 text-green-400"
                )}>
                  +{item.score}
                  {item.comboMultiplier && item.comboMultiplier > 1 && (
                    <span className="ml-1 text-xs">({item.comboMultiplier}x)</span>
                  )}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WordList;
