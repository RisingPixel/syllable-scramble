import { Translations } from '@/types/i18n';

const fr: Translations = {
  common: {
    submit: 'Envoyer',
    back: 'Retour',
    startGame: '🎮 Démarrer',
  },
  welcome: {
    title: 'SYLLABE',
    subtitle: 'Un jeu de mots rapide',
    challengeMode: '🎯 Mode Défi',
    level: 'Niveau',
    player: 'Joueur',
    totalScore: 'Score Total',
    wordsFound: 'Mots Trouvés',
    games: 'Parties',
    howToPlay: 'Comment Jouer',
    findWords: '🎯 Trouver des Mots',
    findWordsDesc: 'Tapez des mots contenant la syllabe donnée',
    beatClock: '⏱️ Contre la Montre',
    beatClockDesc: 'Trouvez autant de mots que possible en 60 secondes',
    example: '💡 Exemple',
    exampleSyllable: 'Si la syllabe est',
    exampleWords: 'action, station, nation...',
  },
  game: {
    findWordsContaining: 'Trouvez des mots contenant',
    score: 'Score',
    typeWord: 'Tapez un mot...',
    target: 'CIBLE',
    foundWords: 'MOTS TROUVÉS',
    errors: {
      tooShort: 'Trop court!',
      alreadyFound: 'Déjà trouvé!',
      missingSyllable: 'Doit contenir "{syllable}"!',
      notInDictionary: 'Mot non trouvé!',
    },
  },
  results: {
    gameOver: 'Partie Terminée',
    youFound: 'Vous avez trouvé',
    words: 'mots',
    totalLetters: 'Lettres Totales',
    finalScore: 'Score Final',
    achievementBonus: 'Bonus Succès',
    tier: 'Rang',
    shareResults: '📤 Partager Résultats',
    backToMenu: '🏠 Retour au Menu',
    rejectedWords: 'Mots Rejetés',
    longestRejected: 'Plus Long Rejeté',
  },
};

export default fr;
