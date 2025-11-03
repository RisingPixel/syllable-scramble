import { useEffect, useState } from 'react';

interface FoundWord {
  word: string;
  score: number;
}

interface WordListProps {
  words: FoundWord[];
  syllable: string;
}

const WordList = ({ words, syllable }: WordListProps) => {
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

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Found Words
        </h3>
        <span className="text-sm text-muted-foreground">
          {words.length} {words.length === 1 ? 'word' : 'words'}
        </span>
      </div>
      <div className="max-h-48 overflow-y-auto space-y-1 bg-card rounded-lg p-3 border border-border">
        {words.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Start typing to find words...
          </p>
        ) : (
          words.map((item, index) => (
            <div
              key={`${item.word}-${index}`}
              className="flex justify-between items-center text-lg animate-slide-up"
            >
              <span className="uppercase font-medium">
                {highlightSyllable(item.word)}
              </span>
              {showScore === item.word && (
                <span className="text-success font-bold animate-fade-in">
                  +{item.score}
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
