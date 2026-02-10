import DAILY_SYLLABLES_2026 from './data/dailySyllables-2026.json';

export const getDailySyllable = (date: Date = new Date()): string => {
  const yyyymmdd = date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  // console.log("TEST: " + DAILY_SYLLABLES_2026.days[yyyymmdd].syllable);
  return DAILY_SYLLABLES_2026.days[yyyymmdd].syllable;
}
