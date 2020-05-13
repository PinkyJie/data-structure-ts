import { bubbleSort } from './bubble-sort';
import { selectionSort } from './selection-sort';
import { insertionSort } from './insertion-sort';
import { mergeSort } from './merge-sort';
import { quickSort } from './quick-sort';
import { bucketSort } from './bucket-sort';

describe('Array: sorting', () => {
  const testArr: {
    arr: number[];
    sortedArr: number[];
  }[] = [];

  for (let i = 0; i < 10; i++) {
    const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 40));
    testArr.push({
      arr: [...arr],
      sortedArr: arr.sort((a, b) => a - b),
    });
  }

  it.each([
    ['Bubble Sort', bubbleSort],
    ['Selection Sort', selectionSort],
    ['Insertion Sort', insertionSort],
    ['Merge Sort', mergeSort],
    ['Quick Sort', quickSort],
    ['Bucket Sort', bucketSort],
  ])('should sort array correctly by %s', (_, sortingFunc) => {
    testArr.forEach(({ arr, sortedArr }) => {
      const copiedArr = [...arr];
      sortingFunc(copiedArr);
      expect(copiedArr).toEqual(sortedArr);
    });
  });
});
