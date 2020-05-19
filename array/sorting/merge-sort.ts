/**
 * Merge Sort
 *
 * Time: O(nlog(n))
 * Space: O(n)
 *  - think it as a balanced binary tree, n elements will be split and the tree height is log(n)
 *  - Divide and Conquer(`_merge`):
 *    - each divide - O(1), log(n) divide in total
 *    - each conquer - O(n), merging 2 arrays with length k costs 2k
 * Best/Worst case: O(nlog(n))
 *  - always split the array to 2 equal arrays util each sub array only has 1 element
 */
export function mergeSort(arr: number[]): void {
  _mergeSort(arr, 0, arr.length - 1);
}

// [startIndex...endIndex] will be sorted
function _mergeSort(arr: number[], startIndex: number, endIndex: number): void {
  if (startIndex < endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    _mergeSort(arr, startIndex, middleIndex);
    _mergeSort(arr, middleIndex + 1, endIndex);
    _merge(arr, startIndex, endIndex, middleIndex);
  }
}

/**
 * [startIndex...middleIndex] is sorted, [middleIndex+1...endIndex] is sorted
 * merge them to make sure [startIndex...endIndex] is sorted.
 *
 * O(endIndex - startIndex)
 * Note: additional space complexity O(endIndex - startIndex)
 */
function _merge(arr: number[], startIndex: number, endIndex: number, middleIndex: number): void {
  let rightIndex = middleIndex + 1;
  const sortedPartialArr = [];
  /**
   * 2 loops here but the complexity is still O(endIndex - startIndex) because a lot of inner
   * loop can be skipped by one comparison.
   */
  for (let leftIndex = startIndex; leftIndex <= middleIndex; leftIndex++) {
    while (rightIndex <= endIndex && arr[rightIndex] < arr[leftIndex]) {
      sortedPartialArr.push(arr[rightIndex]);
      rightIndex++;
    }
    sortedPartialArr.push(arr[leftIndex]);
  }
  /**
   * The length for `sortedPartialArr` might not equal `endIndex - startIndex`, because some of the elements
   * from the right half array might already be at their correct position.
   */
  for (let i = 0; i < sortedPartialArr.length; i++) {
    arr[startIndex + i] = sortedPartialArr[i];
  }
}
