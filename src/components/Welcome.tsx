import { Button } from '@/components/ui/button';
import { Clock, Target, Zap } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  challengeSyllable?: string | null;
}

const Welcome = ({ onStart, challengeSyllable }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl space-y-8 animate-scale-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-4">SYLLABLE</h1>
          <p className="text-xl text-muted-foreground">
            A fast-paced word game
          </p>
          {challengeSyllable && (
            <div className="mt-4 inline-block bg-accent/20 text-accent px-4 py-2 rounded-lg font-bold animate-fade-in">
              🎯 Challenge Mode: {challengeSyllable}
            </div>
          )}
        </div>

        {/* Instructions Card */}
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">How to Play</h2>
          
          <div className="space-y-4">
            {/* Instruction 1 */}
            <div className="flex gap-4 items-start">
              <div className="bg-accent/20 p-3 rounded-lg shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Find Words</h3>
                <p className="text-muted-foreground">
                  Type words that contain the given syllable anywhere in the word
                </p>
              </div>
            </div>

            {/* Instruction 2 */}
            <div className="flex gap-4 items-start">
              <div className="bg-warning/20 p-3 rounded-lg shrink-0">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Beat the Clock</h3>
                <p className="text-muted-foreground">
                  You have 60 seconds to find as many words as possible
                </p>
              </div>
            </div>

            {/* Instruction 3 */}
            <div className="flex gap-4 items-start">
              <div className="bg-success/20 p-3 rounded-lg shrink-0">
                <Zap className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Score Points</h3>
                <p className="text-muted-foreground">
                  Earn 10 points for each letter in your word
                </p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-secondary/50 border border-border rounded-xl p-4 mt-6">
            <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider text-center">
              Example
            </p>
            <div className="text-center space-y-2">
              <p className="text-lg">
                If the syllable is <span className="font-bold bg-accent/30 px-2 py-1 rounded">UR</span>
              </p>
              <p className="text-muted-foreground">You can type:</p>
              <div className="flex flex-wrap justify-center gap-2 text-lg font-medium">
                <span className="bg-card px-3 py-1 rounded-lg border border-border">BURN</span>
                <span className="bg-card px-3 py-1 rounded-lg border border-border">TURTLE</span>
                <span className="bg-card px-3 py-1 rounded-lg border border-border">PURPLE</span>
                <span className="bg-card px-3 py-1 rounded-lg border border-border">HAMBURGER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full text-2xl py-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
