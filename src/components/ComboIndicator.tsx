import { cn } from '@/lib/utils';

interface ComboIndicatorProps {
  comboCount: number;
  multiplier: number;
}

const ComboIndicator = ({ comboCount, multiplier }: ComboIndicatorProps) => {
  if (comboCount === 0) return null;

  const getComboText = () => {
    if (comboCount >= 8) return '🔥 MEGA COMBO!';
    if (comboCount >= 5) return '🔥 SUPER COMBO!';
    if (comboCount >= 3) return '🔥 COMBO!';
    return '✨ Streak';
  };

  const getComboColorClass = () => {
    if (comboCount >= 8) return 'from-orange-500 via-red-500 to-pink-500';
    if (comboCount >= 5) return 'from-red-500 to-orange-500';
    if (comboCount >= 3) return 'from-yellow-500 to-orange-500';
    return 'from-yellow-400 to-yellow-500';
  };

  return (
    <div className="fixed top-20 right-6 animate-scale-in z-40">
      <div
        className={cn(
          'bg-gradient-to-r text-white px-6 py-3 rounded-full shadow-lg',
          getComboColorClass()
        )}
      >
        <div className="text-3xl font-bold text-center">{multiplier.toFixed(1)}x</div>
        <div className="text-sm text-center font-medium">{getComboText()}</div>
        <div className="text-xs text-center opacity-80">{comboCount} words</div>
      </div>
    </div>
  );
};

export default ComboIndicator;
