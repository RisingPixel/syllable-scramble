import { ScoreBreakdown } from '@/types/achievements';
import CenteredPopup from './CenteredPopup';

interface ScorePopupProps {
  breakdown: ScoreBreakdown;
  onComplete: () => void;
}

const ScorePopup = ({ breakdown, onComplete }: ScorePopupProps) => {
  return (
    <CenteredPopup duration={1500} type="success" onComplete={onComplete}>
      <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl shadow-2xl p-4 border-2 border-accent-foreground/20">
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
    </CenteredPopup>
  );
};

export default ScorePopup;
