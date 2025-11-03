import { ScoreBreakdown, ScoreBonus } from '@/types/achievements';

export const calculateScoreWithBreakdown = (
  word: string,
  syllable: string,
  comboMultiplier: number = 1
): ScoreBreakdown => {
  const length = word.length;
  const bonuses: ScoreBonus[] = [];
  let base = 0;

  // Base score progressivo
  if (length <= 3) base = 10;
  else if (length === 4) base = 20;
  else if (length === 5) base = 40;
  else if (length === 6) base = 60;
  else if (length === 7) base = 90;
  else if (length >= 8) {
    base = 130 + (length - 8) * 20;
    if (length >= 10) {
      bonuses.push({
        type: 'length',
        label: 'Epic Word!',
        value: (length - 8) * 20,
        icon: '🌟'
      });
    }
  }

  // Syllable repeat bonus
  const syllableCount = (word.toLowerCase().match(new RegExp(syllable.toLowerCase(), 'g')) || []).length;
  if (syllableCount > 1) {
    const bonus = syllableCount * 20;
    bonuses.push({
      type: 'syllable_repeat',
      label: `${syllableCount}x Syllable!`,
      value: bonus,
      icon: '🎭'
    });
  }

  // Start/End bonus
  const lowerWord = word.toLowerCase();
  const lowerSyl = syllable.toLowerCase();
  if (lowerWord.startsWith(lowerSyl)) {
    bonuses.push({
      type: 'starts_with',
      label: 'Perfect Start!',
      value: 15,
      icon: '🎯'
    });
  }
  if (lowerWord.endsWith(lowerSyl)) {
    bonuses.push({
      type: 'ends_with',
      label: 'Perfect End!',
      value: 15,
      icon: '🎯'
    });
  }

  // Rare letters
  const rareCount = (word.match(/[qxzjkw]/gi) || []).length;
  if (rareCount > 0) {
    bonuses.push({
      type: 'rare_letter',
      label: 'Rare Letters!',
      value: rareCount * 10,
      icon: '✨'
    });
  }

  // Combo multiplier
  if (comboMultiplier > 1) {
    bonuses.push({
      type: 'combo',
      label: `${comboMultiplier}x COMBO!`,
      value: 0,
      icon: '🔥'
    });
  }

  const subtotal = base + bonuses.filter(b => b.type !== 'combo').reduce((sum, b) => sum + b.value, 0);
  const total = Math.floor(subtotal * comboMultiplier);

  return { base, bonuses, total };
};

export const getWordColorClass = (word: string): string => {
  const length = word.length;

  if (length <= 3) return 'text-muted-foreground';
  if (length === 4) return 'text-foreground';
  if (length === 5) return 'text-blue-400';
  if (length === 6) return 'text-green-400';
  if (length === 7) return 'text-purple-400';
  if (length === 8) return 'text-orange-400';
  if (length >= 9) return 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400';

  return 'text-foreground';
};

export const getWordGlowClass = (word: string): string => {
  if (word.length >= 9) return 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]';
  if (word.length >= 7) return 'drop-shadow-[0_0_4px_rgba(168,85,247,0.4)]';
  return '';
};
