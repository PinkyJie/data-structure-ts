import { binarySearch } from './binary-search';

describe('Binary search', () => {
  const sortedArr = [1, 3, 5, 7, 9];

  it.each<[string, { target: number; returnedIndex: number }]>([
    [
      'if the target value is existed',
      {
        target: 3,
        returnedIndex: 1,
      },
    ],
    [
      'if the target value is the left boundary',
      {
        target: 1,
        returnedIndex: 0,
      },
    ],
    [
      'if the target value is the right boundary',
      {
        target: 9,
        returnedIndex: 4,
      },
    ],
    [
      'if the target value is not existed',
      {
        target: 4,
        returnedIndex: 2,
      },
    ],
    [
      'if the target value is smaller than the left boundary',
      {
        target: 0,
        returnedIndex: 0,
      },
    ],
    [
      'if the target value is larger than the right boundary',
      {
        target: 10,
        returnedIndex: 5,
      },
    ],
  ])('should return correct index %s', (_, { target, returnedIndex }) => {
    expect(binarySearch(sortedArr, target)).toBe(returnedIndex);
  });
});
