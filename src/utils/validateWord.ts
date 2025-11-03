import dictionaryData from '../data/dictionary_en.json';

const dictionary = new Set(dictionaryData.words.map(w => w.toLowerCase()));

export const validateWord = (word: string, syllable: string): boolean => {
  const normalized = word.toLowerCase().trim();
  const syllableNorm = syllable.toLowerCase();
  
  if (normalized.length < 2) return false;
  if (!normalized.includes(syllableNorm)) return false;
  
  return dictionary.has(normalized);
};

export const calculateScore = (word: string): number => {
  return word.length * 10;
};

export const getRandomSyllable = (): string => {
  const syllables = ["UR", "POL", "ENV", "TRA", "BIO", "TECH"];
  return syllables[Math.floor(Math.random() * syllables.length)];
};

export const generateComparisonStat = (totalLetters: number): string => {
  const comparisons = [
    { threshold: 5000, text: "That's about the length of a short novel chapter!" },
    { threshold: 3000, text: "That's about 20% the length of a sports article on ESPN!" },
    { threshold: 2000, text: "That's about the length of a blog post!" },
    { threshold: 1000, text: "That's about the length of a newspaper article!" },
    { threshold: 500, text: "That's about the length of a long email!" },
    { threshold: 0, text: "That's a solid start! Keep practicing!" },
  ];
  
  const stat = comparisons.find(c => totalLetters >= c.threshold);
  return stat?.text || comparisons[comparisons.length - 1].text;
};
