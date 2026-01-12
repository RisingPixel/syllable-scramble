export interface Translations {
  common: {
    submit: string;
    back: string;
    startGame: string;
    retry: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    challengeMode: string;
    level: string;
    xp: string;
    wordsInRounds: string;
    howToPlay: string;
    findWords: string;
    findWordsDesc: string;
    beatClock: string;
    beatClockDesc: string;
    example: string;
    exampleSyllable: string;
    exampleWords: string;
    exampleWord1: string;
    exampleWord2: string;
    exampleWord3: string;
    typeWords: string;
    asFastAsYouCan: string;
  };
  game: {
    findWordsContaining: string;
    score: string;
    typeWord: string;
    target: string;
    foundWords: string;
    loadingDictionary: string;
    loadingMessage: string;
    dictionaryError: string;
    dictionaryErrorMessage: string;
    errors: {
      tooShort: string;
      alreadyFound: string;
      missingSyllable: string;
      notInDictionary: string;
    };
  };
  results: {
    levelUp: string;
    levelUpDesc: string;
    xpGained: string;
    continue: string;
    syllableUsed: string;
    youFound: string;
    word: string;
    words: string;
    withLetters: string;
    withLettersShort: string;
    totalScore: string;
    bonus: string;
    rejectedQuote: string;
    shareResults: string;
    backToMenu: string;
  };
}
