/**
 * Common Italian syllables (max 3 letters)
 * Categorized by difficulty/frequency
 */

// Common syllables (easy to find words with)
const COMMON_SYLLABLES = [
  'amo', 'ato', 'ito', 'uto', 'are', 'ere', 'ire', 'oso', 'osa',
  'ano', 'ino', 'ono', 'uno', 'eno', 'ana', 'ina', 'ona', 'una',
  'con', 'per', 'pre', 'pro', 'tra', 'sta', 'sto', 'sco', 'che',
  'chi', 'ghe', 'ghi', 'gia', 'gio', 'cia', 'cio', 'ale', 'ile',
  'one', 'ore', 'ura', 'era', 'ara', 'aro', 'ero', 'iro', 'oro',
] as const;

// Medium difficulty syllables
const MEDIUM_SYLLABLES = [
  'ato', 'eto', 'oto', 'uta', 'ata', 'eta', 'ita', 'ota', 'uta',
  'ico', 'ica', 'eco', 'oco', 'uco', 'aco', 'aso', 'eso', 'iso',
  'oso', 'uso', 'asa', 'esa', 'isa', 'osa', 'usa', 'eno', 'ena',
  'ina', 'ona', 'una', 'aro', 'ero', 'iro', 'uro', 'ore', 'ire',
  'uro', 'ura', 'ara', 'era', 'ira', 'ora', 'ura', 'ata', 'eta',
] as const;

// Challenging syllables (fewer common words)
const HARD_SYLLABLES = [
  'ame', 'ume', 'sce', 'sci', 'gna', 'gno', 'gli', 'gla', 'glo',
  'zia', 'zio', 'fia', 'fio', 'via', 'vio', 'bia', 'bio', 'dia',
  'dio', 'pia', 'pio', 'ria', 'rio', 'mia', 'mio', 'nia', 'nio',
  'lia', 'lio', 'sia', 'tia', 'tio', 'gia', 'gio', 'giu', 'gnu',
  'blu', 'bra', 'bro', 'cra', 'cro', 'dra', 'dro', 'fra', 'fro',
] as const;

// All syllables combined
export const IT_SYLLABLES = [
  ...COMMON_SYLLABLES,
  ...MEDIUM_SYLLABLES,
  ...HARD_SYLLABLES
] as const;
