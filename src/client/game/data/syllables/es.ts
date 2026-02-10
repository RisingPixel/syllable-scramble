/**
 * Common Spanish syllables
 * Categorized by difficulty/frequency
 */

// Common syllables (easy to find words with)
const COMMON_SYLLABLES = [
  'ción', 'sión', 'dad', 'tad', 'miento', 'mente', 'able', 'ible',
  'oso', 'osa', 'ante', 'ente', 'ador', 'edor', 'idor', 'dor',
  'anza', 'encia', 'ancia', 'ura', 'tura', 'dura', 'ero', 'era',
  'ista', 'ismo', 'aje', 'ada', 'ida', 'ado', 'ido', 'ando',
  'iendo', 'con', 'por', 'para', 'que', 'como', 'cuando', 'donde',
] as const;

// Medium difficulty syllables
const MEDIUM_SYLLABLES = [
  'ación', 'ición', 'ución', 'sión', 'ssión', 'mente', 'miento',
  'amiento', 'imiento', 'dor', 'ador', 'edor', 'idor', 'torio',
  'ería', 'anza', 'encia', 'ancia', 'able', 'ible', 'oso', 'osa',
  'ante', 'ente', 'iento', 'uoso', 'uosa', 'ivo', 'iva', 'ero',
  'era', 'ista', 'ismo', 'dad', 'tad', 'tud', 'umbre', 'dura',
] as const;

// Challenging syllables (fewer common words)
const HARD_SYLLABLES = [
  'abilidad', 'ibilidad', 'osidad', 'itud', 'umbre', 'edumbre',
  'amiento', 'imiento', 'miento', 'ción', 'sión', 'xión', 'torio',
  'ería', 'anza', 'encia', 'ancia', 'ísimo', 'ísima', 'érrimo',
  'érrima', 'dero', 'dera', 'tero', 'tera', 'ario', 'aria',
] as const;

// All syllables combined
export const ES_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;
