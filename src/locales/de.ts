import { Translations } from '@/types/i18n';

const de: Translations = {
  common: {
    submit: 'Senden',
    back: 'Zurück',
    startGame: '🎮 Spiel Starten',
  },
  welcome: {
    title: 'SILBE',
    subtitle: 'Ein schnelles Wortspiel',
    challengeMode: '🎯 Herausforderung',
    level: 'Level',
    player: 'Spieler',
    totalScore: 'Gesamtpunktzahl',
    wordsFound: 'Gefundene Wörter',
    games: 'Spiele',
    howToPlay: 'Spielanleitung',
    findWords: '🎯 Wörter Finden',
    findWordsDesc: 'Geben Sie Wörter ein, die die Silbe enthalten',
    beatClock: '⏱️ Gegen die Uhr',
    beatClockDesc: 'Finden Sie so viele Wörter wie möglich in 60 Sekunden',
    example: '💡 Beispiel',
    exampleSyllable: 'Wenn die Silbe ist',
    exampleWords: 'tion, station, nation...',
  },
  game: {
    findWordsContaining: 'Finden Sie Wörter mit',
    score: 'Punktzahl',
    typeWord: 'Geben Sie ein Wort ein...',
    target: 'ZIEL',
    foundWords: 'GEFUNDENE WÖRTER',
    errors: {
      tooShort: 'Zu kurz!',
      alreadyFound: 'Bereits gefunden!',
      missingSyllable: 'Muss "{syllable}" enthalten!',
      notInDictionary: 'Wort nicht gefunden!',
    },
  },
  results: {
    gameOver: 'Spiel Vorbei',
    youFound: 'Sie haben gefunden',
    words: 'Wörter',
    totalLetters: 'Buchstaben Gesamt',
    finalScore: 'Endpunktzahl',
    achievementBonus: 'Erfolgs-Bonus',
    tier: 'Stufe',
    shareResults: '📤 Ergebnisse Teilen',
    backToMenu: '🏠 Zurück zum Menü',
    rejectedWords: 'Abgelehnte Wörter',
    longestRejected: 'Längstes Abgelehnt',
  },
};

export default de;
