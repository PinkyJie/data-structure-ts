import { swap } from '../../_util';

/**
 * Bubble Sort
 *
 * Time: O(n^2)
 * Space: O(1)
 * Best case: sorted array => O(n)
 *  - no swap happens, only one comparison for each inner loop
 *  - `swapped` variable to control early termination
 * Worst case: reversed sorted array => O(n^2)
 *  - `lastUnsortedIndex` comparisons and swaps happen for each inner loop
 */
export function bubbleSort(arr: number[]): void {
  const n = arr.length;
  for (let lastUnsortedIndex = n - 1; lastUnsortedIndex > 0; lastUnsortedIndex--) {
    /**
     * Every inner loop will swap the "largest" number to the position at `lastUnsortedIndex`,
     * so that position becomes "sorted" ([lastUnsortedIndex...n]), `lastUnsortedIndex` can decrease by 1.
     */
    let swapped = false;
    for (let i = 0; i < lastUnsortedIndex; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
    // if no swapping happens, the array is already sorted
    if (!swapped) {
      return;
    }
  }
}
