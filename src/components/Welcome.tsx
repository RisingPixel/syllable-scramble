import { Button } from "@/components/ui/button";
import { Clock, Target } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
  challengeSyllable?: string | null;
}

const Welcome = ({ onStart, challengeSyllable }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 py-6 bg-background">
      {/* Portrait Layout */}
      <div className="w-full max-w-2xl space-y-3 sm:space-y-4 md:space-y-5 my-auto max-h-[95vh] overflow-y-auto landscape:hidden">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            SYLLABLE
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">A fast-paced word game</p>
          {challengeSyllable && (
            <div className="mt-2 sm:mt-4 inline-block bg-accent/20 text-accent px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-bold animate-fade-in">
              🎯 Challenge Mode: {challengeSyllable}
            </div>
          )}
        </div>

        {/* Instructions Card */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">How to Play</h2>

          <div className="space-y-4">
            {/* Instruction 1 */}
            <div className="flex gap-4 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.3s" }}>
          <div className="bg-accent/20 p-2 sm:p-3 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1">Find Words</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Type words that contain the given syllable</p>
              </div>
            </div>

            {/* Instruction 2 */}
            <div className="flex gap-4 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.4s" }}>
          <div className="bg-warning/20 p-2 sm:p-3 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-warning" />
          </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-1">Beat the Clock</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Find as many words as possible</p>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-secondary/50 border border-border rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 hover:bg-secondary/70 transition-all duration-300 animate-fade-in-up-slow" style={{ animationDelay: "0.5s" }}>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wider text-center">Example</p>
            <div className="text-center space-y-2">
              <p className="text-base sm:text-lg">
                If the syllable is <span className="font-bold bg-accent/30 px-2 py-1 rounded">UR</span>
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">You can type:</p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-lg font-medium">
                <span className="bg-card px-2 py-1 sm:px-3 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.6s" }}>BURN</span>
                <span className="bg-card px-2 py-1 sm:px-3 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.7s" }}>TURTLE</span>
                <span className="bg-card px-2 py-1 sm:px-3 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.8s" }}>PURPLE</span>
                <span className="bg-card px-2 py-1 sm:px-3 sm:py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.9s" }}>HAMBURGER</span>
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
            className="w-full text-lg sm:text-xl md:text-2xl py-6 sm:py-7 md:py-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wider transition-all animate-pulse-glow hover:scale-105 shadow-lg shadow-accent/50"
          >
            🎮 Start Game
          </Button>
        </div>
      </div>

      {/* Landscape Layout */}
      <div className="hidden landscape:flex landscape:flex-col w-full max-w-5xl h-screen justify-center items-center px-6 gap-3">
        {/* Header - Centered Top */}
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight mb-1 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            SYLLABLE
          </h1>
          <p className="text-sm text-muted-foreground">A fast-paced word game</p>
        </div>

        {/* Two Columns - Middle */}
        <div className="flex gap-4 w-full">
          {/* Left Column - How to Play */}
          <div className="w-1/2">
            <div className="bg-card border border-border rounded-xl p-4 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-fade-in-up-slow" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-base font-bold text-center mb-3">How to Play</h2>
              
              <div className="space-y-2.5">
                {/* Instruction 1 */}
                <div className="flex gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.3s" }}>
                  <div className="bg-accent/20 p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
                    <Target className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Find Words</h3>
                    <p className="text-xs text-muted-foreground">Type words that contain the syllable</p>
                  </div>
                </div>

                {/* Instruction 2 */}
                <div className="flex gap-3 items-start animate-fade-in-up-slow" style={{ animationDelay: "0.4s" }}>
                  <div className="bg-warning/20 p-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-110">
                    <Clock className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Beat the Clock</h3>
                    <p className="text-xs text-muted-foreground">Find as many words as possible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Example */}
          <div className="w-1/2">
            <div className="bg-secondary/50 border border-border rounded-xl p-4 hover:bg-secondary/70 transition-all duration-300 animate-fade-in-up-slow" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider text-center font-bold">Example</p>
              <div className="space-y-2.5">
                <p className="text-sm text-center">
                  Syllable: <span className="font-bold bg-accent/30 px-2 py-1 rounded text-base">UR</span>
                </p>
                <p className="text-xs text-muted-foreground text-center">You can type:</p>
                <div className="flex flex-wrap justify-center gap-2 text-xs font-medium">
                  <span className="bg-card px-2 py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.6s" }}>BURN</span>
                  <span className="bg-card px-2 py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.7s" }}>TURTLE</span>
                  <span className="bg-card px-2 py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.8s" }}>PURPLE</span>
                  <span className="bg-card px-2 py-1 rounded-lg border border-border animate-fade-in-up-slow hover:scale-110 hover:border-accent transition-all cursor-default" style={{ animationDelay: "0.9s" }}>HAMBURGER</span>
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
