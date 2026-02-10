/**
 * Common French syllables
 * Categorized by difficulty/frequency
 */

// Common syllables (easy to find words with)
const COMMON_SYLLABLES = [
  'tion', 'ment', 'able', 'ible', 'eur', 'eur', 'ance', 'ence',
  'isme', 'iste', 'age', 'esse', 'erie', 'ais', 'ait', 'ant',
  'ent', 'ont', 'aire', 'oire', 'ure', 'ture', 'ier', 'eau',
  'aux', 'eux', 'con', 'pour', 'par', 'dans', 'sur', 'avec',
  'que', 'qui', 'quoi', 'leur', 'leur', 'elle', 'ette', 'elle',
] as const;

// Medium difficulty syllables
const MEDIUM_SYLLABLES = [
  'ation', 'sion', 'ssion', 'teur', 'trice', 'ième', 'esse',
  'iste', 'isme', 'eur', 'euse', 'ance', 'ence', 'ière',
  'able', 'ible', 'isation', 'ement', 'ette', 'ique', 'aine',
  'itude', 'erie', 'ois', 'oise', 'ien', 'ienne', 'ain', 'aine',
  'oir', 'oire', 'age', 'ette', 'elle', 'eau', 'eaux', 'ant',
] as const;

// Challenging syllables (fewer common words)
const HARD_SYLLABLES = [
  'amment', 'emment', 'ution', 'uction', 'escence', 'iscence',
  'itude', 'atoire', 'itoire', 'issime', 'issime', 'itude',
  'ueux', 'ueuse', 'ieux', 'ieuse', 'ation', 'ition', 'ution',
  'issement', 'issement', 'aille', 'eille', 'ouille', 'aille',
] as const;

// All syllables combined
export const FR_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;
