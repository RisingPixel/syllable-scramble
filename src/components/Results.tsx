import { Button } from '@/components/ui/button';
import { generateComparisonStat } from '@/utils/validateWord';
import { Sparkles, Star } from 'lucide-react';

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
      <div className="w-full max-w-xl space-y-6 text-center">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-8">SYLLABLE</h1>
        </div>

        {/* Decorative Stars */}
        <div className="flex justify-center gap-4 mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Star className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: '0s' }} />
          <Star className="w-8 h-8 text-accent fill-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Star className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Main Results */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-2">
            <div className="text-2xl text-muted-foreground">
              You found
            </div>
            <div className="text-6xl font-bold">
              <span className="text-accent">{words.length}</span> {words.length === 1 ? 'word' : 'words'}
            </div>
            <div className="text-xl text-muted-foreground">
              with a total of <span className="text-foreground font-bold text-2xl">{totalLetters}</span> letters!
            </div>
          </div>

          {/* Comparison Stat - More Prominent */}
          <div className="text-lg font-semibold text-foreground max-w-md mx-auto pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {comparisonStat}
          </div>
        </div>

        {/* Fun Fact - More Subtle */}
        {words.length > 0 && (
          <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-muted-foreground/70 italic max-w-sm mx-auto">
              "It's a pity that you also wrote {words.length} word{words.length !== 1 ? 's' : ''} we didn't know about... In "KONAMABMUIKER" an actual word!"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={onRetry}
            size="lg"
            className="w-full max-w-sm text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
