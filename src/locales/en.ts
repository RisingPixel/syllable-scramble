import { Translations } from '@/types/i18n';

const en: Translations = {
  common: {
    submit: 'Submit',
    back: 'Back',
    startGame: '🎮 Start Game',
  },
  welcome: {
    title: 'SYLLABLE',
    subtitle: 'A fast-paced word game',
    challengeMode: '🎯 Challenge Mode',
    level: 'Level',
    player: 'Player',
    totalScore: 'Total Score',
    wordsFound: 'Words Found',
    games: 'Games',
    howToPlay: 'How to Play',
    findWords: '🎯 Find Words',
    findWordsDesc: 'Type words that contain the given syllable',
    beatClock: '⏱️ Beat the Clock',
    beatClockDesc: 'Find as many words as possible in 60 seconds',
    example: '💡 Example',
    exampleSyllable: 'If the syllable is',
    exampleWords: 'table, portable, comfortable...',
  },
  game: {
    findWordsContaining: 'Find words containing',
    score: 'Score',
    typeWord: 'Type a word...',
    target: 'TARGET',
    foundWords: 'FOUND WORDS',
    errors: {
      tooShort: 'Too short!',
      alreadyFound: 'Already found!',
      missingSyllable: 'Must contain "{syllable}"!',
      notInDictionary: 'Word not found!',
    },
  },
  results: {
    gameOver: 'Game Over',
    youFound: 'You found',
    words: 'words',
    totalLetters: 'Total Letters',
    finalScore: 'Final Score',
    achievementBonus: 'Achievement Bonus',
    tier: 'Tier',
    shareResults: '📤 Share Results',
    backToMenu: '🏠 Back to Menu',
    rejectedWords: 'Rejected Words',
    longestRejected: 'Longest Rejected',
  },
};

export default en;
