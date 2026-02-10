import { showForm } from '@devvit/web/client';
import { FormEffectResponse } from '@devvit/web/client';
import { Button } from "./ui/button";
import { Star, Share2, Home, Sparkles } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Confetti from "./Confetti";
import { Achievement, FoundWord } from "../types/achievements";
import { addGameResults } from "../utils/playerProgress";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface ResultsProps {
  words: FoundWord[];
  totalLetters: number;
  rejectedWords: string[];
  syllable: string;
  onBackToMenu: () => void;
  achievements?: Achievement[];
}

const Results = ({ words, totalLetters, rejectedWords, syllable, onBackToMenu, achievements = [] }: ResultsProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  
  const totalScore = words.reduce((sum, w) => sum + w.score, 0);

  // Calculate achievement bonus
  const achievementBonus = achievements.reduce((sum, a) => sum + a.points, 0);
  const finalScore = totalScore + achievementBonus;

  // Inline score tier calculation
  const tier = 
    finalScore >= 1000 ? { name: "LEGENDARY", color: "from-yellow-400 to-orange-500", icon: "👑" } :
    finalScore >= 700 ? { name: "DIAMOND", color: "from-blue-400 to-purple-500", icon: "💎" } :
    finalScore >= 500 ? { name: "GOLD", color: "from-yellow-400 to-yellow-600", icon: "🏆" } :
    finalScore >= 300 ? { name: "SILVER", color: "from-gray-300 to-gray-400", icon: "🥈" } :
    { name: "BRONZE", color: "from-orange-300 to-orange-400", icon: "🥉" };

  // Find the longest rejected word
  const longestRejected =
    rejectedWords.length > 0
      ? rejectedWords.reduce((longest, word) => (word && longest && word.length > longest.length ? word : longest))
      : null;

  // Update player progress on mount
  useEffect(() => {
    const calculatedXP = finalScore + (words.length * 10);
    setXpGained(calculatedXP);
    
    const result = addGameResults(finalScore, words.length);
    
    if (result.leveledUp) {
      setNewLevel(result.newLevel);
      setShowLevelUp(true);
    }
  }, []); // Empty deps - run only once on mount

  /* const handleShare = async () => {
    const shareText = `🎮 SYLLABLE Challenge!\n\nI found ${words.length} word${words.length !== 1 ? "s" : ""} with syllable "${syllable}"!\n${tier.icon} ${tier.name} Rank - ${finalScore} points\n\nCan you beat me?`;

    
  }; */
  const handleShare = async () => {
    const commentText =
      `🎮 **SYLLABLE Challenge Result**\n\n` +
      `I completed the challenge with **${words.length}** word${words.length !== 1 ? 's' : ''}!\n\n` +
      `${tier.icon} **${tier.name} Rank** — ${finalScore} points\n\n` +
      `Can you beat this score? 👀`;

    const formResult = await showForm({
      form: {
        title: 'Share your result',
        description:
          `A comment will be added to this post from your account:\n\n` +
          `${commentText}`,
        fields: [
          {
            type: 'paragraph',
            name: 'description',
            label: 'Share your comments',
            placeholder: 'Do you want to add something else?'
          }
        ],
        acceptLabel: 'Post comment'
      }, data: { description: ''}
    });

    console.log(formResult.action);

    if (formResult) {
      const { description } = formResult;
      console.log("Description: " + description);
      /*const additionalText = formResult.description.trim();


      const finalComment =
        commentText +
        (additionalText ? `\n\n---\n${additionalText}` : '');


      console.log(`Description: ${formResult.description} --- \n\n Final comment: ${finalComment}`)*/

      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentText }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to share');
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-background">
      {/* Level Up Popup */}
      {/* 
      {showLevelUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-card border-4 border-accent rounded-2xl p-8 text-center animate-scale-in max-w-md mx-4">
            <Sparkles className="w-16 h-16 text-accent mx-auto mb-4 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
              {t('results.levelUp')}
            </h2>
            <p className="text-7xl font-bold text-accent mb-4 animate-pulse">{newLevel}</p>
            <p className="text-muted-foreground mb-2">{t('results.levelUpDesc', { level: newLevel.toString() })}</p>
            <p className="text-sm text-muted-foreground/70 mb-6">{t('results.xpGained', { xp: xpGained.toString() })}</p>
            <Button 
              onClick={() => setShowLevelUp(false)} 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8"
              size="lg"
            >
              {t('results.continue')}
            </Button>
          </div>
        </div>
      )}
      */}

      {/* Confetti for high scores */}
      {finalScore >= 500 && <Confetti count={finalScore >= 1000 ? 100 : 50} />}

      {/* Portrait Layout */}
      <div className="w-full max-w-xl space-y-6 text-center landscape:hidden">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-8">{t('welcome.title')}</h1>
        </div>

        {/* Decorative Stars */}
        <div className="flex justify-center gap-4 mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Star className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: "0s" }} />
          <Star className="w-8 h-8 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
          <Star className="w-6 h-6 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>

        {/* Syllable Display */}
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <div className="text-sm text-muted-foreground mb-2">{t('results.syllableUsed')}</div>
          <div className="text-3xl font-bold tracking-wider bg-secondary px-4 py-2 rounded-lg inline-block">
            {syllable}
          </div>
        </div>

        {/* Main Results */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-2">
            <div className="text-2xl text-muted-foreground">{t('results.youFound')}</div>
            <div className="text-6xl font-bold">
              <span className="text-accent">{words.length}</span> {words.length === 1 ? t('results.word') : t('results.words')}
            </div>
            <div className="text-xl text-muted-foreground">
              {t('results.withLetters', { letters: totalLetters.toString() })}
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-card border border-border rounded-xl p-4 max-w-sm mx-auto">
            <div className="text-sm text-muted-foreground mb-1">{t('results.totalScore')}</div>
            <div className="text-4xl font-bold text-accent">{totalScore}</div>
            {achievementBonus > 0 && (
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">{t('results.bonus')} </span>
                <span className="text-green-400 font-bold">{achievementBonus} pts</span>
                <div className="text-2xl font-bold text-foreground mt-1">= {finalScore}</div>
              </div>
            )}
          </div>
        </div>

        {/* Fun Fact - More Subtle */}
        {rejectedWords.length > 0 && longestRejected && (
          <div className="pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-xs text-muted-foreground/70 italic max-w-sm mx-auto">
              {t('results.rejectedQuote', { 
                count: rejectedWords.length.toString(),
                plural: rejectedWords.length !== 1 ? 's' : '',
                longest: longestRejected 
              })}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="w-full max-w-sm text-lg py-6 font-bold uppercase tracking-wider"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {t('results.shareResults')}
          </Button>
          <Button
            onClick={onBackToMenu}
            size="lg"
            className="w-full max-w-sm text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider"
          >
            <Home className="w-5 h-5 mr-2" />
            {t('results.backToMenu')}
          </Button>
        </div>
      </div>

      {/* Landscape Layout */}
      <div className="hidden landscape:flex w-full max-w-5xl max-h-screen overflow-hidden gap-6 items-center animate-scale-in px-4">
        {/* Left Column */}
        <div className="w-1/2 text-center space-y-3">
          {/* Header + Stars */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold tracking-tight mb-2">{t('welcome.title')}</h1>
            <div className="flex justify-center gap-2 mb-3">
              <Star className="w-4 h-4 text-accent fill-accent animate-pulse" style={{ animationDelay: "0s" }} />
              <Star className="w-5 h-5 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.2s" }} />
              <Star className="w-4 h-4 text-accent fill-accent animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Syllable Display */}
          <div className="animate-fade-in">
            <div className="text-xs text-muted-foreground mb-1">{t('results.syllableUsed')}</div>
            <div className="text-2xl font-bold tracking-wider bg-secondary px-3 py-1.5 rounded-lg inline-block">
              {syllable}
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-card border border-border rounded-xl p-3 max-w-xs mx-auto animate-fade-in">
            <div className="text-xs text-muted-foreground mb-1">{t('results.totalScore')}</div>
            <div className="text-3xl font-bold text-accent">{totalScore}</div>
            {achievementBonus > 0 && (
              <div className="mt-1 text-xs">
                <span className="text-muted-foreground">{t('results.bonus')} </span>
                <span className="text-green-400 font-bold">{achievementBonus} pts</span>
                <div className="text-xl font-bold text-foreground mt-0.5">= {finalScore}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 space-y-3">
          {/* Main Results */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="text-lg text-muted-foreground">{t('results.youFound')}</div>
            <div className="text-4xl font-bold">
              <span className="text-accent">{words.length}</span> {words.length === 1 ? t('results.word') : t('results.words')}
            </div>
            <div className="text-sm text-muted-foreground">
              {t('results.withLettersShort', { letters: totalLetters.toString() })}
            </div>
          </div>

          {/* Fun Fact */}
          {rejectedWords.length > 0 && longestRejected && (
            <div className="animate-fade-in">
              <p className="text-xs text-muted-foreground/70 italic max-w-xs mx-auto">
                {t('results.rejectedQuote', { 
                  count: rejectedWords.length.toString(),
                  plural: rejectedWords.length !== 1 ? 's' : '',
                  longest: longestRejected 
                })}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button
              onClick={handleShare}
              size="lg"
              variant="outline"
              className="w-full max-w-sm text-lg py-6 font-bold uppercase tracking-wider"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {t('results.shareResults')}
            </Button>
            <Button
              onClick={onBackToMenu}
              size="lg"
              className="w-full max-w-sm text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider"
            >
              <Home className="w-5 h-5 mr-2" />
              {t('results.backToMenu')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
