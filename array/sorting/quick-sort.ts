import { swap } from '../../_util';

/**
 * Quick Sort
 *
 * Time: O(nlog(n))
 * Space: O(1) - ignore recursive call stack space cost
 *  - think it as a unbalanced binary tree, n elements will be split and the tree height is log(n)~n
 *  - Divide(`_partition`) and Conquer:
 *    - each divide - O(n), log(n)~n divide in total
 *    - each conquer - O(1), no conquer cost, after each divide the pivot element is correctly positioned
 * Best case: O(nlog(n))
 *  - every divide will generate a k/2-pivot-k/2 partition, the binary tree is balanced, so the tree
 * height is log(n)
 * Worst case: O(n^2)
 *  - every pivot we choose is the smallest/largest element in the sub array, this will generates
 * a 0-pivot-(k-1) partition, the binary tree will degraded to a skewed tree, so the tree height is n
 */
export function quickSort(arr: number[]): void {
  _quickSort(arr, 0, arr.length - 1);
}

// [startIndex...endIndex] will be sorted
function _quickSort(arr: number[], startIndex: number, endIndex: number): void {
  if (startIndex < endIndex) {
    const pivotIndex = _partition(arr, startIndex, endIndex);
    _quickSort(arr, startIndex, pivotIndex - 1);
    _quickSort(arr, pivotIndex + 1, endIndex);
  }
}

/**
 * Every partition will return the index for the pivot element(use random element as pivot),
 * all the other elements will be compared with pivot, and pivot element will be swapped
 * to the correct position: on the left side of this position, the elements are smaller
 * than pivot, while on the right side of this partition, the elements are larger than
 * pivot. This pivot position index will be returned.
 *
 * O(endIndex - startIndex)
 */
function _partition(arr: number[], startIndex: number, endIndex: number): number {
  // use `endIndex - startIndex + 1` to make sure the random number to be in range [0, endIndex - startIndex]
  const pivotIndex = startIndex + Math.floor(Math.random() * (endIndex - startIndex + 1));
  const pivot = arr[pivotIndex];
  // swap the pivot to the `startIndex`
  swap(arr, pivotIndex, startIndex);
  let firstIndexLargerThanPivot = startIndex + 1;
  for (let i = firstIndexLargerThanPivot; i <= endIndex; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, firstIndexLargerThanPivot);
      firstIndexLargerThanPivot++;
    }
  }
  swap(arr, startIndex, firstIndexLargerThanPivot - 1);
  return firstIndexLargerThanPivot - 1;
}
