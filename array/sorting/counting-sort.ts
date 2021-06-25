/**
 * Counting Sort
 * A non-comparison sorting method, based on the counting occurrences.
 *
 * Time: O(n+k) - k is the maximum number in the array
 * Space: O(k) - need a frequency array to store frequency (counting) for each element
 * Best/Worst case: O(n+k)
 *  - if k is way smaller than n, then it'll be O(n)
 *  - if k is way bigger than n, then space cost is too much
 */
export function countingSort(arr: number[]): void {
  const frequencyArray: number[] = [];
  arr.forEach((element) => {
    if (!frequencyArray[element]) {
      frequencyArray[element] = 0;
    }
    frequencyArray[element]++;
  });
  let i = 0;
  frequencyArray.forEach((elementFrequency, index) => {
    if (elementFrequency) {
      for (let j = 0; j < elementFrequency; j++) {
        arr[i++] = index;
      }
    }
  });
}
