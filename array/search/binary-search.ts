/**
 * Binary Search
 *
 * O(log(n))
 *
 * Binary search only work on sorted array, every time the search range is half sized.
 *  - search range: [startIndex, endIndex) includes left boundary, exclude right boundary
 *  - check `endIndex` change condition first
 *  - return value `startIndex`: the smallest index which can meet the `endIndex` change condition
 *  - if we need to insert `target` into the original array, the returned index will be the correct
 * index (even if the `target` is not existed in the current array)
 */
export function binarySearch(sortedArr: number[], target: number): number {
  let startIndex = 0;
  let endIndex = sortedArr.length;

  while (startIndex < endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    /**
     * Why not `sortedArr[middleIndex] === target`? The following code can handle both scenarios:
     *  - if `target` is not existed, return the closet one bigger than `target`
     *  - if `target` is existed, e.g. `sortedArr[middleIndex] === target`, `middleIndex` will be
     * excluded from the search range at first because of [startIndex, endIndex), but don't worry,
     * `startIndex` will converge to the original `middleIndex` (the index of `target`).
     *
     * Note: `startIndex` can be `array.length` if the `target` is larger than the biggest number in the array.
     */
    if (sortedArr[middleIndex] >= target) {
      endIndex = middleIndex;
    } else {
      startIndex = middleIndex + 1;
    }
  }
  return startIndex;
}
