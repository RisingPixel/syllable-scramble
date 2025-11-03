export const getSyllableFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get('syl');
};

export const validateSyllableParam = (syl: string): boolean => {
  if (!syl || syl.length < 2 || syl.length > 4) return false;
  return /^[a-zA-Z]+$/.test(syl);
};

export const createChallengeUrl = (syllable: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?syl=${syllable.toUpperCase()}`;
};
