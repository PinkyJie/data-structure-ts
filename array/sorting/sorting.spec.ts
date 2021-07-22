import { bubbleSort } from './bubble-sort';
import { selectionSort } from './selection-sort';
import { insertionSort } from './insertion-sort';
import { mergeSort } from './merge-sort';
import { quickSort } from './quick-sort';
import { countingSort } from './counting-sort';
import { radixSort } from './radix-sort';
import { bucketSort } from './bucket-sort';

describe('Array: sorting', () => {
  const testArr: {
    arr: number[];
    sortedArr: number[];
  }[] = [];

  for (let i = 0; i < 10; i++) {
    const arr = new Array(20).fill(0).map(() => Math.floor(Math.random() * 40));
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
    ['Counting Sort', countingSort],
    ['Radix Sort', radixSort],
  ])('should sort array correctly by %s', (_, sortingFunc) => {
    testArr.forEach(({ arr, sortedArr }) => {
      const copiedArr = [...arr];
      sortingFunc(copiedArr);
      expect(copiedArr).toEqual(sortedArr);
    });
  });

  it('should sort array correctly by Bucket sort', () => {
    testArr.forEach(({ arr, sortedArr }) => {
      const copiedArr = [...arr];
      bucketSort(copiedArr, 10);
      expect(copiedArr).toEqual(sortedArr);
    });
  });
});
