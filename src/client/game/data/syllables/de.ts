/**
 * Common German syllables
 * Categorized by difficulty/frequency
 */

// Common syllables (easy to find words with)
const COMMON_SYLLABLES = [
  'ung', 'heit', 'keit', 'schaft', 'lich', 'bar', 'sam', 'los',
  'chen', 'lein', 'nis', 'tum', 'ion', 'tät', 'ismus', 'ist',
  'eur', 'age', 'ment', 'ant', 'ent', 'anz', 'enz', 'ieren',
  'ver', 'zer', 'vor', 'her', 'hin', 'aus', 'ein', 'auf',
  'bei', 'mit', 'nach', 'über', 'unter', 'durch', 'gegen',
] as const;

// Medium difficulty syllables
const MEDIUM_SYLLABLES = [
  'igkeit', 'lichkeit', 'barkeit', 'samkeit', 'schaft', 'ung',
  'heit', 'keit', 'chen', 'lein', 'ismus', 'ist', 'ieren',
  'ation', 'ition', 'ution', 'sion', 'ssion', 'ant', 'ent',
  'tät', 'ität', 'ivität', 'abilität', 'ibiltät', 'anz', 'enz',
  'ieren', 'lich', 'bar', 'sam', 'los', 'voll', 'reich', 'arm',
] as const;

// Challenging syllables (fewer common words)
const HARD_SYLLABLES = [
  'igkeit', 'lichkeit', 'barkeit', 'samkeit', 'haftigkeit',
  'mäßigkeit', 'losigkeit', 'fähigkeit', 'würdigkeit', 'ismus',
  'tät', 'ivität', 'abilität', 'ibiltät', 'ation', 'ition',
  'ution', 'sion', 'ssion', 'ierung', 'nisierung', 'isierung',
] as const;

// All syllables combined
export const DE_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;
