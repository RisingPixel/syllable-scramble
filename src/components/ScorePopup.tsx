import { useEffect } from 'react';
import { ScoreBreakdown } from '@/types/achievements';
import { cn } from '@/lib/utils';

interface ScorePopupProps {
  breakdown: ScoreBreakdown;
  position: { x: number; y: number };
  onComplete: () => void;
}

const ScorePopup = ({ breakdown, position, onComplete }: ScorePopupProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: position.x, top: position.y }}
    >
      <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl shadow-2xl p-4 animate-scale-in border-2 border-accent-foreground/20">
        {/* Total score - Large */}
        <div className="text-4xl font-bold text-center mb-2">
          +{breakdown.total}
        </div>

        {/* Bonuses breakdown */}
        {breakdown.bonuses.length > 0 && (
          <div className="space-y-1 text-sm">
            {breakdown.bonuses.map((bonus, i) => (
              <div
                key={i}
                className="flex items-center gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span>{bonus.icon}</span>
                <span className="font-medium">{bonus.label}</span>
                {bonus.value > 0 && <span className="ml-auto">+{bonus.value}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScorePopup;
