import { Translations } from '@/types/i18n';

const es: Translations = {
  common: {
    submit: 'Enviar',
    back: 'Volver',
    startGame: '🎮 Iniciar Juego',
  },
  welcome: {
    title: 'SÍLABA',
    subtitle: 'Un juego de palabras rápido',
    challengeMode: '🎯 Modo Desafío',
    level: 'Nivel',
    player: 'Jugador',
    totalScore: 'Puntuación Total',
    wordsFound: 'Palabras Encontradas',
    games: 'Partidas',
    howToPlay: 'Cómo Jugar',
    findWords: '🎯 Encontrar Palabras',
    findWordsDesc: 'Escribe palabras que contengan la sílaba dada',
    beatClock: '⏱️ Contra el Reloj',
    beatClockDesc: 'Encuentra tantas palabras como sea posible en 60 segundos',
    example: '💡 Ejemplo',
    exampleSyllable: 'Si la sílaba es',
    exampleWords: 'ción, acción, estación...',
  },
  game: {
    findWordsContaining: 'Encuentra palabras que contengan',
    score: 'Puntuación',
    typeWord: 'Escribe una palabra...',
    target: 'OBJETIVO',
    foundWords: 'PALABRAS ENCONTRADAS',
    errors: {
      tooShort: '¡Muy corta!',
      alreadyFound: '¡Ya encontrada!',
      missingSyllable: '¡Debe contener "{syllable}"!',
      notInDictionary: '¡Palabra no encontrada!',
    },
  },
  results: {
    gameOver: 'Fin del Juego',
    youFound: 'Encontraste',
    words: 'palabras',
    totalLetters: 'Letras Totales',
    finalScore: 'Puntuación Final',
    achievementBonus: 'Bonus Logros',
    tier: 'Rango',
    shareResults: '📤 Compartir Resultados',
    backToMenu: '🏠 Volver al Menú',
    rejectedWords: 'Palabras Rechazadas',
    longestRejected: 'Más Larga Rechazada',
  },
};

export default es;
