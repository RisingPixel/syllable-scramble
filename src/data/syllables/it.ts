/**
 * Common Italian syllables
 * Categorized by difficulty/frequency
 */

// Common syllables (easy to find words with)
const COMMON_SYLLABLES = [
  'zione', 'mente', 'bile', 'tore', 'tura', 'enza', 'anza',
  'ità', 'ezza', 'ismo', 'ante', 'ente', 'oso', 'are',
  'ere', 'ire', 'ato', 'ito', 'uto', 'ale', 'ile', 'one',
  'con', 'per', 'pre', 'pro', 'tra', 'sta', 'stra', 'sco',
  'che', 'chi', 'ghe', 'ghi', 'gia', 'gio', 'cia', 'cio',
] as const;

// Medium difficulty syllables
const MEDIUM_SYLLABLES = [
  'aggio', 'eggio', 'evole', 'abile', 'ibile', 'issimo',
  'ino', 'etto', 'ello', 'ista', 'ico', 'mento', 'trice',
  'essa', 'iere', 'izia', 'udine', 'iglio', 'aglia', 'oglio',
  'anza', 'enza', 'ezza', 'otto', 'atto', 'ento', 'anti',
  'enti', 'tivo', 'tiva', 'sivo', 'siva', 'zione', 'sione',
  'cosa', 'cose', 'tore', 'tori', 'nale', 'rale', 'tale',
] as const;

// Challenging syllables (fewer common words)
const HARD_SYLLABLES = [
  'udine', 'agine', 'igine', 'ume', 'ame', 'zione', 'gione',
  'mente', 'tudine', 'itudine', 'evole', 'ifero', 'ifico',
  'anzioso', 'enzioso', 'aggio', 'eggio', 'uggio', 'issimo',
  'errimo', 'aceo', 'esco', 'esco', 'iere', 'ario', 'orio',
] as const;

// All syllables combined
export const IT_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;
