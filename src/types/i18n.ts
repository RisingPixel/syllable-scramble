export interface Translations {
  common: {
    submit: string;
    back: string;
    startGame: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    challengeMode: string;
    level: string;
    player: string;
    totalScore: string;
    wordsFound: string;
    games: string;
    howToPlay: string;
    findWords: string;
    findWordsDesc: string;
    beatClock: string;
    beatClockDesc: string;
    example: string;
    exampleSyllable: string;
    exampleWords: string;
  };
  game: {
    findWordsContaining: string;
    score: string;
    typeWord: string;
    target: string;
    foundWords: string;
    errors: {
      tooShort: string;
      alreadyFound: string;
      missingSyllable: string;
      notInDictionary: string;
    };
  };
  results: {
    gameOver: string;
    youFound: string;
    words: string;
    totalLetters: string;
    finalScore: string;
    achievementBonus: string;
    tier: string;
    shareResults: string;
    backToMenu: string;
    rejectedWords: string;
    longestRejected: string;
  };
}
