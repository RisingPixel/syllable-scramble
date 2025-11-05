import { Button } from "@/components/ui/button";
import { Clock, Target, Trophy } from "lucide-react";
import { PlayerProgress } from "@/utils/playerProgress";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface WelcomeProps {
  onStart: () => void;
  challengeSyllable?: string | null;
  playerProgress: PlayerProgress;
}

const Welcome = ({ onStart, challengeSyllable, playerProgress }: WelcomeProps) => {
  const { t } = useLanguage();
  const xpPercentage = (playerProgress.experiencePoints / playerProgress.experienceToNextLevel) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 py-6 bg-background relative">
      {/* Language Selector - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Portrait Layout */}
      <div className="w-full max-w-2xl flex flex-col gap-2.5 sm:gap-3 my-auto landscape:hidden">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            {t('welcome.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">{t('welcome.subtitle')}</p>
          {challengeSyllable && (
            <div className="mt-2 sm:mt-4 inline-block bg-accent/20 text-accent px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-bold animate-fade-in">
              {t('welcome.challengeMode')}: {challengeSyllable}
            </div>
          )}
        </div>

        {/* Compact Player Stats Bar */}
        <div className="bg-card border border-border rounded-xl px-4 py-3 animate-fade-in-up-slow flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
          {/* Level Badge */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg shadow-accent/30 flex-shrink-0">
            <span className="text-sm font-bold text-accent-foreground">{playerProgress.level}</span>
          </div>
          
          {/* Stats Text - All Inline */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="font-semibold text-foreground">{t('welcome.level')} {playerProgress.level}</span>
            </div>
            
            <span className="text-muted-foreground/50 hidden sm:inline">•</span>
            
            <span className="whitespace-nowrap">
              {playerProgress.experiencePoints} / {playerProgress.experienceToNextLevel} {t('welcome.xp')}
            </span>
            
            <span className="text-muted-foreground/50 hidden sm:inline">•</span>
            
            <span className="whitespace-nowrap">
              {t('welcome.wordsInRounds', { words: playerProgress.totalWordsFound, games: playerProgress.gamesPlayed })}
            </span>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-card border border-border rounded-xl p-3 sm:p-4 space-y-3 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg sm:text-xl font-bold text-center">{t('welcome.howToPlay')}</h2>

          <div className="space-y-2.5 sm:space-y-3">
            {/* Instruction 1 */}
            <div className="flex gap-2.5 sm:gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.3s" }}>
          <div className="bg-accent/20 p-1.5 sm:p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t('welcome.findWords')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('welcome.findWordsDesc')}</p>
              </div>
            </div>

            {/* Instruction 2 */}
            <div className="flex gap-2.5 sm:gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.4s" }}>
          <div className="bg-warning/20 p-1.5 sm:p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
          </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-0.5">{t('welcome.beatClock')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('welcome.beatClockDesc')}</p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-secondary/50 border border-border rounded-xl p-2.5 sm:p-3 mt-3 hover:bg-secondary/70 transition-all duration-300 animate-fade-in-up-slow" style={{ animationDelay: "0.5s" }}>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase tracking-wider text-center">{t('welcome.example')}</p>
            <div className="text-center space-y-1.5">
              <p className="text-sm sm:text-base">
                {t('welcome.exampleSyllable')} <span className="font-bold bg-accent/30 px-1.5 py-0.5 rounded text-sm sm:text-base">UR</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{t('welcome.exampleWords')}</p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium">
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.6s" }}>{t('welcome.exampleWord1')}</span>
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.7s" }}>{t('welcome.exampleWord2')}</span>
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.8s" }}>{t('welcome.exampleWord3')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button Section */}
        <div className="animate-fade-in-up-slow" style={{ animationDelay: "1s" }}>

          {/* Start Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-base sm:text-lg md:text-xl py-4 sm:py-5 md:py-6 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all animate-pulse-glow hover:scale-105 shadow-lg shadow-accent/50"
          >
            {t('common.startGame')}
          </Button>
        </div>
      </div>

      {/* Landscape Layout */}
      <div className="hidden landscape:flex landscape:flex-col w-full max-w-6xl h-screen justify-center items-center px-6 gap-3">
        {/* Header - Centered Top */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-1 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            {t('welcome.title')}
          </h1>
          <p className="text-sm text-muted-foreground">{t('welcome.subtitle')}</p>
        </div>

        {/* Compact Stats Bar */}
        <div className="w-full bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-center gap-3 animate-fade-in-up-slow" style={{ animationDelay: "0.1s" }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg shadow-accent/30 flex-shrink-0">
            <span className="text-sm font-bold text-accent-foreground">{playerProgress.level}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="font-semibold text-foreground">{t('welcome.level')} {playerProgress.level}</span>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <span className="whitespace-nowrap">
              {playerProgress.experiencePoints} / {playerProgress.experienceToNextLevel} {t('welcome.xp')}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <span className="whitespace-nowrap">
              {t('welcome.wordsInRounds', { words: playerProgress.totalWordsFound, games: playerProgress.gamesPlayed })}
            </span>
          </div>
        </div>

        {/* Instructions Card - Full Width */}
        <div className="w-full">
            <div className="bg-card border border-border rounded-xl p-4 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-base font-bold text-center mb-3">{t('welcome.howToPlay')}</h2>
              
              <div className="space-y-3 text-xs">
                <p className="text-center text-muted-foreground">
                  <Target className="w-3 h-3 inline mr-1 text-accent" />
                  {t('welcome.typeWords')} 
                  <Clock className="w-3 h-3 inline ml-2 mr-1 text-warning" />
                  {t('welcome.asFastAsYouCan')}
                </p>
                
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <span className="text-muted-foreground">{t('welcome.example')}: </span>
                  <span className="font-bold bg-accent/30 px-1.5 py-0.5 rounded">UR</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="font-medium">{t('welcome.exampleWord1')}, {t('welcome.exampleWord2')}, {t('welcome.exampleWord3')}</span>
                </div>
              </div>
            </div>
          </div>

        {/* Start Button - Bottom */}
        <div className="w-full animate-fade-in-up-slow" style={{ animationDelay: "1s" }}>
          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-lg py-5 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent/50 hover:shadow-xl hover:shadow-accent/60"
          >
            {t('common.startGame')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
