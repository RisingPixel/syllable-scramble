import { ScoreBreakdown, ScoreBonus } from '../types/achievements';

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
