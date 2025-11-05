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
    xp: 'XP',
    wordsInRounds: 'palabras en {games} partidas',
    howToPlay: 'Cómo Jugar',
    findWords: 'Encontrar Palabras',
    findWordsDesc: 'Escribe palabras que contengan la sílaba dada',
    beatClock: 'Contra el Reloj',
    beatClockDesc: 'Encuentra tantas palabras como sea posible',
    example: 'Ejemplo',
    exampleSyllable: 'Si la sílaba es',
    exampleWords: 'Puedes escribir:',
    typeWords: 'Escribe palabras que contengan la sílaba',
    asFastAsYouCan: '¡lo más rápido posible!',
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
    levelUp: '¡SUBISTE DE NIVEL!',
    levelUpDesc: '¡Has alcanzado el nivel {level}!',
    xpGained: '+{xp} XP ganados esta partida',
    continue: 'Continuar',
    syllableUsed: 'Sílaba usada:',
    youFound: 'Encontraste',
    word: 'palabra',
    words: 'palabras',
    withLetters: '¡con un total de {letters} letras!',
    withLettersShort: '¡con {letters} letras!',
    totalScore: 'Puntuación Total',
    bonus: '+ Bonus:',
    rejectedQuote: '"Lástima que también escribiste {count} palabra{plural} que no conocíamos... ¿"{longest}" es una palabra real!?"',
    shareResults: 'Compartir Resultados',
    backToMenu: 'Volver al Menú',
  },
};

export default es;
