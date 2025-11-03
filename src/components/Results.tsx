import { Button } from '@/components/ui/button';
import { generateComparisonStat } from '@/utils/validateWord';
import { Sparkles } from 'lucide-react';

interface FoundWord {
  word: string;
  score: number;
}

interface ResultsProps {
  words: FoundWord[];
  totalLetters: number;
  onRetry: () => void;
}

const Results = ({ words, totalLetters, onRetry }: ResultsProps) => {
  const totalScore = words.reduce((sum, w) => sum + w.score, 0);
  const comparisonStat = generateComparisonStat(totalLetters);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl space-y-8 text-center animate-scale-in">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2">SYLLABLE</h1>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-accent/20 p-6 rounded-full animate-pulse-success">
            <Sparkles className="w-16 h-16 text-accent" />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div>
            <div className="text-6xl font-bold mb-2">
              You found <span className="text-accent">{words.length}</span> {words.length === 1 ? 'word' : 'words'}
            </div>
            <div className="text-3xl text-muted-foreground">
              with a total of <span className="text-foreground font-semibold">{totalLetters}</span> letters!
            </div>
          </div>

          <div className="text-xl text-muted-foreground max-w-lg mx-auto">
            {comparisonStat}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-4xl font-bold text-accent mb-2">
              {totalScore} points
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Total Score
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        {words.length > 0 && (
          <div className="bg-secondary/50 border border-border rounded-xl p-4 text-left max-w-md mx-auto">
            <p className="text-sm text-muted-foreground italic">
              "It's a pity that you also wrote {words.length} word{words.length !== 1 ? 's' : ''} we didn't know about... In "KONAMABMUIKER" an actual word!"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onRetry}
            size="lg"
            className="w-full text-xl py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
