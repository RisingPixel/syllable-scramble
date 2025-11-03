export interface Achievement {
  id: string;
  name: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  condition: (gameData: GameData) => boolean;
  points: number;
}

export interface GameData {
  foundWords: FoundWord[];
  rejectedWords: string[];
  timeLeft: number;
  syllable: string;
  totalScore: number;
  lastSubmitTime?: number;
  comboCount?: number;
}

export interface FoundWord {
  word: string;
  score: number;
  baseScore?: number;
  comboMultiplier?: number;
  timestamp: number;
  bonuses?: ScoreBonus[];
}

export interface ScoreBonus {
  type: 'length' | 'syllable_repeat' | 'starts_with' | 'ends_with' | 'rare_letter' | 'combo';
  label: string;
  value: number;
  icon: string;
}

export interface ScoreBreakdown {
  base: number;
  bonuses: ScoreBonus[];
  total: number;
}

export interface ComboState {
  count: number;
  multiplier: number;
  lastSubmitTime: number | null;
}

export interface UnlockedAchievement extends Achievement {
  unlockedAt: number;
}
