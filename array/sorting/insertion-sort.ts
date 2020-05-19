/**
 * Insertion Sort
 *
 * Time: O(n^2)
 * Space: O(1)
 * Best case: sorted array => O(n)
 *  - no "move to right" happens, only one comparison for each inner loop
 *  - `break` to control early termination
 * Worst case: reversed sorted array => O(n^2)
 *  - `lastSortedIndex` comparisons and "move to right" happen for each inner loop
 */
export function insertionSort(arr: number[]): void {
  const n = arr.length;
  for (let lastSortedIndex = 0; lastSortedIndex < n - 1; lastSortedIndex++) {
    /**
     * Every inner loop will insert the new element to the already sorted array ([0...lastSortedIndex]),
     * so `lastSortedIndex` can increase by 1.
     */
    const elementToInsert = arr[lastSortedIndex + 1];
    let i = lastSortedIndex;
    for (; i >= 0; i--) {
      if (elementToInsert < arr[i]) {
        arr[i + 1] = arr[i];
      } else {
        // find the correct position for `elementToInsert`
        break;
      }
    }
    arr[i + 1] = elementToInsert;
  }
}
