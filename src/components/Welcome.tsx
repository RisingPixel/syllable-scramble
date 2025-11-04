import { Button } from "@/components/ui/button";
import { Clock, Target, Trophy, Zap } from "lucide-react";
import { PlayerProgress } from "@/utils/playerProgress";

interface WelcomeProps {
  onStart: () => void;
  challengeSyllable?: string | null;
  playerProgress: PlayerProgress;
}

const Welcome = ({ onStart, challengeSyllable, playerProgress }: WelcomeProps) => {
  const xpPercentage = (playerProgress.experiencePoints / playerProgress.experienceToNextLevel) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 py-6 bg-background">
      {/* Portrait Layout */}
      <div className="w-full max-w-2xl flex flex-col gap-2.5 sm:gap-3 my-auto landscape:hidden">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-1.5 sm:mb-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            SYLLABLE
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">A fast-paced word game</p>
          {challengeSyllable && (
            <div className="mt-2 sm:mt-4 inline-block bg-accent/20 text-accent px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-bold animate-fade-in">
              🎯 Challenge Mode: {challengeSyllable}
            </div>
          )}
        </div>

        {/* Player Stats Card */}
        <div className="bg-card border border-accent/50 rounded-xl p-3 sm:p-4 animate-fade-in-up-slow" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg shadow-accent/30">
              <span className="text-xl sm:text-2xl font-bold text-accent-foreground">{playerProgress.level}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                Level {playerProgress.level} Player
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {playerProgress.experiencePoints} / {playerProgress.experienceToNextLevel} XP
              </p>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="w-full bg-secondary rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-accent to-accent/80 h-full transition-all duration-500 shadow-sm shadow-accent/50"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            <div className="bg-secondary/50 rounded-lg p-1.5 sm:p-2">
              <p className="text-lg sm:text-xl font-bold text-accent">{playerProgress.totalScore.toLocaleString()}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Total Score</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-1.5 sm:p-2">
              <p className="text-lg sm:text-xl font-bold text-accent">{playerProgress.totalWordsFound}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Words Found</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-1.5 sm:p-2">
              <p className="text-lg sm:text-xl font-bold text-accent">{playerProgress.gamesPlayed}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase">Games</p>
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-card border border-border rounded-xl p-3 sm:p-4 space-y-3 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg sm:text-xl font-bold text-center">How to Play</h2>

          <div className="space-y-2.5 sm:space-y-3">
            {/* Instruction 1 */}
            <div className="flex gap-2.5 sm:gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.3s" }}>
          <div className="bg-accent/20 p-1.5 sm:p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-0.5">Find Words</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Type words that contain the given syllable</p>
              </div>
            </div>

            {/* Instruction 2 */}
            <div className="flex gap-2.5 sm:gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.4s" }}>
          <div className="bg-warning/20 p-1.5 sm:p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
          </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-0.5">Beat the Clock</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Find as many words as possible</p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-secondary/50 border border-border rounded-xl p-2.5 sm:p-3 mt-3 hover:bg-secondary/70 transition-all duration-300 animate-fade-in-up-slow" style={{ animationDelay: "0.5s" }}>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase tracking-wider text-center">Example</p>
            <div className="text-center space-y-1.5">
              <p className="text-sm sm:text-base">
                If the syllable is <span className="font-bold bg-accent/30 px-1.5 py-0.5 rounded text-sm sm:text-base">UR</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">You can type:</p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium">
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.6s" }}>BURN</span>
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.7s" }}>TURTLE</span>
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.8s" }}>PURPLE</span>
                <span className="bg-card px-2 py-0.5 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-105 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.9s" }}>HAMBURGER</span>
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
            🎮 Start Game
          </Button>
        </div>
      </div>

      {/* Landscape Layout */}
      <div className="hidden landscape:flex landscape:flex-col w-full max-w-6xl h-screen justify-center items-center px-6 gap-3">
        {/* Header - Centered Top */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-1 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            SYLLABLE
          </h1>
          <p className="text-sm text-muted-foreground">A fast-paced word game</p>
        </div>

        {/* Three Columns - Middle */}
        <div className="flex gap-4 w-full">
          {/* Left Column - Player Stats (1/3) */}
          <div className="w-1/3">
            <div className="bg-card border border-accent/50 rounded-xl p-4 animate-fade-in-up-slow" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg shadow-accent/30">
                  <span className="text-xl font-bold text-accent-foreground">{playerProgress.level}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm flex items-center gap-1.5 truncate">
                    <Trophy className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span className="truncate">Level {playerProgress.level}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {playerProgress.experiencePoints} / {playerProgress.experienceToNextLevel} XP
                  </p>
                </div>
              </div>
              
              {/* XP Bar */}
              <div className="w-full bg-secondary rounded-full h-2 mb-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-accent to-accent/80 h-full transition-all duration-500 shadow-sm shadow-accent/50"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
              
              {/* Stats Grid */}
              <div className="space-y-2">
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-accent">{playerProgress.totalScore.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Score</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className="text-base font-bold text-accent">{playerProgress.totalWordsFound}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Words</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2 text-center">
                    <p className="text-base font-bold text-accent">{playerProgress.gamesPlayed}</p>
                    <p className="text-[9px] text-muted-foreground uppercase">Games</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle + Right Columns (2/3) - Ultra Compact */}
          <div className="w-2/3">
            <div className="bg-card border border-border rounded-xl p-4 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-base font-bold text-center mb-3">How to Play</h2>
              
              <div className="space-y-3 text-xs">
                <p className="text-center text-muted-foreground">
                  <Target className="w-3 h-3 inline mr-1 text-accent" />
                  Type words containing the syllable 
                  <Clock className="w-3 h-3 inline ml-2 mr-1 text-warning" />
                  as fast as you can!
                </p>
                
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <span className="text-muted-foreground">Example: </span>
                  <span className="font-bold bg-accent/30 px-1.5 py-0.5 rounded">UR</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="font-medium">BURN, TURTLE, PURPLE</span>
                </div>
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
            🎮 Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
