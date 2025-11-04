export interface PlayerProgress {
  totalScore: number;
  totalWordsFound: number;
  gamesPlayed: number;
  level: number;
  experiencePoints: number;
  experienceToNextLevel: number;
}

const STORAGE_KEY = 'syllable_player_progress';

// XP formula: score + (wordsCount * 10)
// Level formula: level * 100 XP needed for next level

export const getExperienceForNextLevel = (level: number): number => {
  return level * 100;
};

export const calculateLevel = (totalXP: number): { level: number; currentXP: number; xpForNext: number } => {
  let level = 1;
  let xpRemaining = totalXP;
  
  while (xpRemaining >= getExperienceForNextLevel(level)) {
    xpRemaining -= getExperienceForNextLevel(level);
    level++;
  }
  
  return {
    level,
    currentXP: xpRemaining,
    xpForNext: getExperienceForNextLevel(level)
  };
};

export const loadPlayerProgress = (): PlayerProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load player progress:', error);
  }
  
  // Default initial state
  return {
    totalScore: 0,
    totalWordsFound: 0,
    gamesPlayed: 0,
    level: 1,
    experiencePoints: 0,
    experienceToNextLevel: 100
  };
};

export const savePlayerProgress = (progress: PlayerProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save player progress:', error);
  }
};

export const addGameResults = (score: number, wordsCount: number): { leveledUp: boolean; newLevel: number; oldLevel: number } => {
  const progress = loadPlayerProgress();
  const oldLevel = progress.level;
  
  // Calculate XP gained
  const xpGained = score + (wordsCount * 10);
  
  // Update stats
  progress.totalScore += score;
  progress.totalWordsFound += wordsCount;
  progress.gamesPlayed += 1;
  
  // Calculate total XP (we need to reconstruct it from current level and XP)
  let totalXP = progress.experiencePoints;
  for (let i = 1; i < progress.level; i++) {
    totalXP += getExperienceForNextLevel(i);
  }
  totalXP += xpGained;
  
  // Recalculate level based on total XP
  const levelData = calculateLevel(totalXP);
  progress.level = levelData.level;
  progress.experiencePoints = levelData.currentXP;
  progress.experienceToNextLevel = levelData.xpForNext;
  
  savePlayerProgress(progress);
  
  return {
    leveledUp: levelData.level > oldLevel,
    newLevel: levelData.level,
    oldLevel
  };
};
