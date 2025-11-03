/**
 * Common English syllables (3+ letters)
 * Categorized by difficulty/frequency for potential future features
 */

// Common syllables (easy to find words with)
export const COMMON_SYLLABLES = [
  'tion', 'ment', 'ness', 'able', 'ful', 'less', 'ous',
  'ence', 'ance', 'ship', 'hood', 'ward', 'work', 'play', 'time',
  'way', 'day', 'side', 'land', 'light', 'some', 'where', 'the',
  'one', 'come', 'new', 'out', 'over', 'under', 'with', 'for',
  'age', 'ate', 'ture', 'sure', 'tive', 'sion', 'cal', 'ter',
  'con', 'pro', 'pre', 'com', 'man', 'ber', 'der', 'ver',
  'per', 'dis', 'mis', 'sub', 'sur', 'mon', 'ple', 'ble',
  'est', 'ish', 'ted', 'end', 'ent', 'ant'
] as const;

// Medium difficulty syllables
export const MEDIUM_SYLLABLES = [
  'ers', 'tions', 'lar', 'mer', 'col', 'ger', 'low', 'par',
  'son', 'tle', 'pen', 'car', 'ten', 'tor', 'can', 'fac',
  'fer', 'gen', 'pos', 'tain', 'den', 'mag', 'set', 'men',
  'min', 'rec', 'sen', 'tal', 'tic', 'ties', 'but', 'cit',
  'cle', 'cov', 'dif', 'ern', 'eve', 'hap', 'ies', 'ket',
  'lec', 'main', 'mar', 'nal', 'ning', 'pres', 'sup', 'tem',
  'tin', 'tri', 'tro', 'gan', 'gle', 'head', 'high', 'nore',
  'part', 'por', 'read', 'rep', 'tend', 'ther', 'ton', 'try',
  'uer', 'bet', 'bles', 'bod', 'cap', 'cial', 'cir', 'cor',
  'coun', 'cus', 'dan', 'dle', 'ered', 'fin', 'form', 'har',
  'lands', 'let', 'long', 'mat', 'meas', 'mem', 'mul', 'ner',
  'ples', 'ply', 'port', 'press', 'sat', 'sec', 'ser', 'south',
  'sun', 'ting', 'tra', 'tures', 'val', 'var', 'vid', 'wil',
  'win', 'won', 'act', 'air', 'als', 'bat', 'cate', 'cen'
] as const;

// Challenging syllables (fewer common words)
export const HARD_SYLLABLES = [
  'char', 'cul', 'ders', 'east', 'fect', 'fish', 'fix', 'grand',
  'great', 'heav', 'hunt', 'ion', 'its', 'lat', 'lead', 'lect',
  'lent', 'lin', 'mal', 'mil', 'moth', 'near', 'nel', 'net',
  'point', 'prac', 'ral', 'rect', 'ried', 'round', 'row', 'sand',
  'self', 'sent', 'sim', 'sions', 'sis', 'sons', 'stand', 'sug',
  'tel', 'tom', 'tors', 'tract', 'tray', 'vel', 'west', 'writ'
] as const;

// All syllables combined
export const ALL_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;

export type Syllable = typeof ALL_SYLLABLES[number];

/**
 * Get a random syllable from all available syllables
 */
export const getRandomSyllable = (): string => {
  const syllables = ALL_SYLLABLES;
  return syllables[Math.floor(Math.random() * syllables.length)].toUpperCase();
};

/**
 * Get a random syllable from a specific difficulty level
 */
export const getRandomSyllableByDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed' = 'mixed'
): string => {
  let pool: readonly string[];
  
  switch (difficulty) {
    case 'easy':
      pool = COMMON_SYLLABLES;
      break;
    case 'medium':
      pool = MEDIUM_SYLLABLES;
      break;
    case 'hard':
      pool = HARD_SYLLABLES;
      break;
    case 'mixed':
    default:
      pool = ALL_SYLLABLES;
      break;
  }
  
  return pool[Math.floor(Math.random() * pool.length)].toUpperCase();
};

/**
 * Get syllable statistics
 */
export const getSyllableStats = () => ({
  total: ALL_SYLLABLES.length,
  common: COMMON_SYLLABLES.length,
  medium: MEDIUM_SYLLABLES.length,
  hard: HARD_SYLLABLES.length
});
