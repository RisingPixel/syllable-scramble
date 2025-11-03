import { Button } from '@/components/ui/button';
import { generateComparisonStat } from '@/utils/validateWord';
import { Star, Share2, Trophy, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createChallengeUrl } from '@/utils/urlParams';
import { cn } from '@/lib/utils';
import Confetti from './Confetti';
import { Achievement } from '@/types/achievements';
import { getTierColor } from '@/utils/achievements';

interface FoundWord {
  word: string;
  score: number;
}

interface ResultsProps {
  words: FoundWord[];
  totalLetters: number;
  rejectedWords: string[];
  syllable: string;
  onRetry: () => void;
  achievements?: Achievement[];
}

const Results = ({ words, totalLetters, rejectedWords, syllable, onRetry, achievements = [] }: ResultsProps) => {
  const { toast } = useToast();
  const totalScore = words.reduce((sum, w) => sum + w.score, 0);
  const comparisonStat = generateComparisonStat(totalLetters);
  
  // Calculate achievement bonus
  const achievementBonus = achievements.reduce((sum, a) => sum + a.points, 0);
  const finalScore = totalScore + achievementBonus;
  
  // Score tier calculation
  const getScoreTier = (score: number) => {
    if (score >= 1000) return { name: 'LEGENDARY', color: 'from-yellow-400 to-orange-500', icon: '👑' };
    if (score >= 700) return { name: 'DIAMOND', color: 'from-blue-400 to-purple-500', icon: '💎' };
    if (score >= 500) return { name: 'GOLD', color: 'from-yellow-400 to-yellow-600', icon: '🏆' };
    if (score >= 300) return { name: 'SILVER', color: 'from-gray-300 to-gray-400', icon: '🥈' };
    return { name: 'BRONZE', color: 'from-orange-300 to-orange-400', icon: '🥉' };
  };
  
  const tier = getScoreTier(finalScore);
  
  // Find the longest rejected word
  const longestRejected = rejectedWords.length > 0
    ? rejectedWords.reduce((longest, word) => 
        word.length > longest.length ? word : longest
      , rejectedWords[0])
    : null;

  const handleShare = async () => {
    const challengeUrl = createChallengeUrl(syllable);
    const achievementText = achievements.length > 0 ? `\n🏆 ${achievements.length} Achievements Unlocked!` : '';
    const shareText = `🎮 SYLLABLE Challenge!\n\nI found ${words.length} word${words.length !== 1 ? 's' : ''} with syllable "${syllable}"!\n${tier.icon} ${tier.name} Rank - ${finalScore} points${achievementText}\n\nCan you beat me? 👇\n${challengeUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SYLLABLE Game Challenge',
          text: shareText,
        });
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Share your results with friends",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      {/* Confetti for high scores */}
      {finalScore >= 500 && <Confetti count={finalScore >= 1000 ? 100 : 50} />}
      
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

        {/* Syllable Display */}
        <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="text-sm text-muted-foreground mb-2">Syllable used:</div>
          <div className="text-3xl font-bold tracking-wider bg-secondary px-4 py-2 rounded-lg inline-block">
            {syllable}
          </div>
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
          
          {/* Score Display */}
          <div className="bg-card border border-border rounded-xl p-4 max-w-sm mx-auto">
            <div className="text-sm text-muted-foreground mb-1">Total Score</div>
            <div className="text-4xl font-bold text-accent">{totalScore}</div>
            {achievementBonus > 0 && (
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">+ Bonus: </span>
                <span className="text-green-400 font-bold">{achievementBonus} pts</span>
                <div className="text-2xl font-bold text-foreground mt-1">= {finalScore}</div>
              </div>
            )}
          </div>

          {/* Comparison Stat */}
          <div className="text-lg font-semibold text-foreground max-w-md mx-auto pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {comparisonStat}
          </div>
        </div>
        
        {/* Fun Fact - More Subtle */}
        {rejectedWords.length > 0 && longestRejected && (
          <div className="pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs text-muted-foreground/70 italic max-w-sm mx-auto">
              "It's a pity that you also wrote {rejectedWords.length} word{rejectedWords.length !== 1 ? 's' : ''} we didn't know about... Is "{longestRejected}" an actual word!?"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="w-full max-w-sm text-lg py-6 font-bold uppercase tracking-wider"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
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
