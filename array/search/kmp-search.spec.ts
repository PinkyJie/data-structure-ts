import { kmpSearch } from './kmp-search';

describe('KMP string match', () => {
  it.each<{
    text: string;
    pattern: string;
    matchOne?: boolean;
    matchedIndices: number[];
  }>([
    {
      text: 'aabaacaadaabaaba',
      pattern: 'aaba',
      matchOne: false,
      matchedIndices: [0, 9, 12],
    },
    {
      text: 'aabaacaadaabaaba',
      pattern: 'aaba',
      matchedIndices: [0],
    },
    {
      text: 'ABABDABACDABABCABAB',
      pattern: 'ABABCABAB',
      matchOne: false,
      matchedIndices: [10],
    },
  ])('should return correct matched indices for case %#', ({ text, pattern, matchOne, matchedIndices }) => {
    expect(kmpSearch(text, pattern, matchOne)).toEqual(matchedIndices);
  });
});
