import { Achievement, GameData } from '@/types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
  // In-Game Achievements
  {
    id: 'hot_streak',
    name: '🔥 Hot Streak',
    description: 'Find 5 words in a row without errors',
    tier: 'silver',
    condition: (data) => data.foundWords.length >= 5 && data.rejectedWords.length === 0,
    points: 50
  },
  {
    id: 'speed_demon',
    name: '⚡ Speed Demon',
    description: 'Find 3 words in 15 seconds',
    tier: 'gold',
    condition: (data) => {
      if (data.foundWords.length < 3) return false;
      const last3 = data.foundWords.slice(-3);
      const timeSpan = last3[2].timestamp - last3[0].timestamp;
      return timeSpan <= 15000;
    },
    points: 75
  },
  {
    id: 'word_wizard',
    name: '🧙 Word Wizard',
    description: 'Find 10 words in one game',
    tier: 'gold',
    condition: (data) => data.foundWords.length >= 10,
    points: 100
  },
  {
    id: 'double_trouble',
    name: '🎭 Double Trouble',
    description: 'Find a word with the syllable twice',
    tier: 'silver',
    condition: (data) => {
      return data.foundWords.some(w => {
        const count = (w.word.toLowerCase().match(new RegExp(data.syllable.toLowerCase(), 'g')) || []).length;
        return count >= 2;
      });
    },
    points: 50
  },
  {
    id: 'triple_threat',
    name: '🎪 Triple Threat',
    description: 'Find a word with the syllable three times',
    tier: 'gold',
    condition: (data) => {
      return data.foundWords.some(w => {
        const count = (w.word.toLowerCase().match(new RegExp(data.syllable.toLowerCase(), 'g')) || []).length;
        return count >= 3;
      });
    },
    points: 100
  },
  
  // End-Game Achievements
  {
    id: 'perfectionist',
    name: '💎 Perfectionist',
    description: 'Complete game with 0 rejected words',
    tier: 'diamond',
    condition: (data) => data.foundWords.length >= 5 && data.rejectedWords.length === 0,
    points: 150
  },
  {
    id: 'dictionary_king',
    name: '👑 Dictionary King',
    description: 'Find 15+ words in one game',
    tier: 'diamond',
    condition: (data) => data.foundWords.length >= 15,
    points: 200
  },
  {
    id: 'long_word_legend',
    name: '📏 Long Word Legend',
    description: 'Find a word with 10+ letters',
    tier: 'gold',
    condition: (data) => data.foundWords.some(w => w.word.length >= 10),
    points: 100
  },
  {
    id: 'rare_letter_master',
    name: '✨ Rare Letter Master',
    description: 'Use Q, X, Z, J, K, or W in a word',
    tier: 'silver',
    condition: (data) => data.foundWords.some(w => /[qxzjkw]/i.test(w.word)),
    points: 50
  },
  {
    id: 'combo_master',
    name: '🔥 Combo Master',
    description: 'Reach a 5x combo multiplier',
    tier: 'gold',
    condition: (data) => data.foundWords.some(w => (w.comboMultiplier || 1) >= 5),
    points: 100
  },
  {
    id: 'early_bird',
    name: '🐦 Early Bird',
    description: 'Find 5 words in the first 30 seconds',
    tier: 'silver',
    condition: (data) => {
      if (data.foundWords.length < 5) return false;
      return data.foundWords[4].timestamp <= 30000;
    },
    points: 50
  },
  {
    id: 'last_second_hero',
    name: '⏰ Last Second Hero',
    description: 'Find a word with less than 5 seconds left',
    tier: 'silver',
    condition: (data) => {
      return data.foundWords.some(w => {
        const timeElapsed = w.timestamp / 1000;
        return 60 - timeElapsed < 5;
      });
    },
    points: 50
  }
];

export const checkAchievements = (
  gameData: GameData,
  unlockedAchievements: Set<string>
): Achievement[] => {
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!unlockedAchievements.has(achievement.id) && achievement.condition(gameData)) {
      newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
};

export const getTierColor = (tier: Achievement['tier']): string => {
  switch (tier) {
    case 'diamond':
      return 'from-blue-400 to-purple-500';
    case 'gold':
      return 'from-yellow-400 to-yellow-600';
    case 'silver':
      return 'from-gray-300 to-gray-500';
    case 'bronze':
      return 'from-orange-300 to-orange-500';
  }
};
