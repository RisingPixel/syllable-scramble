import { Translations } from '@/types/i18n';

const it: Translations = {
  common: {
    submit: 'Invia',
    back: 'Indietro',
    startGame: '🎮 Inizia Partita',
  },
  welcome: {
    title: 'SILLABA',
    subtitle: 'Un gioco di parole veloce',
    challengeMode: '🎯 Modalità Sfida',
    level: 'Livello',
    player: 'Giocatore',
    totalScore: 'Punteggio Totale',
    wordsFound: 'Parole Trovate',
    games: 'Partite',
    howToPlay: 'Come Giocare',
    findWords: '🎯 Trova Parole',
    findWordsDesc: 'Scrivi parole che contengono la sillaba data',
    beatClock: '⏱️ Batti il Tempo',
    beatClockDesc: 'Trova quante più parole possibile in 60 secondi',
    example: '💡 Esempio',
    exampleSyllable: 'Se la sillaba è',
    exampleWords: 'azione, stazione, nazione...',
  },
  game: {
    findWordsContaining: 'Trova parole contenenti',
    score: 'Punteggio',
    typeWord: 'Scrivi una parola...',
    target: 'OBIETTIVO',
    foundWords: 'PAROLE TROVATE',
    errors: {
      tooShort: 'Troppo corta!',
      alreadyFound: 'Già trovata!',
      missingSyllable: 'Deve contenere "{syllable}"!',
      notInDictionary: 'Parola non trovata!',
    },
  },
  results: {
    gameOver: 'Fine Partita',
    youFound: 'Hai trovato',
    words: 'parole',
    totalLetters: 'Lettere Totali',
    finalScore: 'Punteggio Finale',
    achievementBonus: 'Bonus Obiettivi',
    tier: 'Livello',
    shareResults: '📤 Condividi Risultati',
    backToMenu: '🏠 Torna al Menu',
    rejectedWords: 'Parole Rifiutate',
    longestRejected: 'Più Lunga Rifiutata',
  },
};

export default it;
