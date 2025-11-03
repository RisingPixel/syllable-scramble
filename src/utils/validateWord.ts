// Load words from the open-source dictionary
let dictionary: Set<string> | null = null;

const loadDictionary = async (): Promise<Set<string>> => {
  if (dictionary) return dictionary;
  
  try {
    const response = await fetch('/src/data/words_raw.txt');
    const text = await response.text();
    
    const words = text
      .split('\n')
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length >= 2 && w.length <= 15)
      .filter(w => /^[a-z]+$/.test(w));
    
    dictionary = new Set(words);
    return dictionary;
  } catch (error) {
    console.error('Failed to load dictionary:', error);
    // Fallback to empty set
    dictionary = new Set();
    return dictionary;
  }
};

// Initialize dictionary immediately
loadDictionary();

export const validateWord = async (word: string, syllable: string): Promise<boolean> => {
  const normalized = word.toLowerCase().trim();
  const syllableNorm = syllable.toLowerCase();
  
  if (normalized.length < 2) return false;
  if (!normalized.includes(syllableNorm)) return false;
  
  const dict = await loadDictionary();
  return dict.has(normalized);
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
