import { swap } from '../../_util';

/**
 * Selection Sort
 *
 * Time: O(n^2)
 * Space: O(1)
 * Best/Worst case: O(n^2)
 *  - no way to do early termination, always need to compare the selected element with all remaining elements
 *  - `n - selectedIndex` comparisons happen for each inner loop, at most 1 swap happens
 */
export function selectionSort(arr: number[]): void {
  const n = arr.length;
  for (let selectedIndex = 0; selectedIndex < n; selectedIndex++) {
    /**
     * Every inner loop will swap the "smallest" number to the position at `selectedIndex`,
     * so that position becomes "sorted" ([0...selectedIndex]), `selectedIndex` can increase by 1.
     */
    let smallestIndex = selectedIndex;
    for (let i = selectedIndex + 1; i < n; i++) {
      if (arr[i] < arr[smallestIndex]) {
        smallestIndex = i;
      }
    }
    if (smallestIndex !== selectedIndex) {
      swap(arr, smallestIndex, selectedIndex);
    }
  }
}
