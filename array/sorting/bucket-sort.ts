/**
 * Bucket Sort
 *
 * Time: O(n+k) - k is the range of all numbers
 * Space: O(k) - need a bucket array to store frequency for each element
 * Best/Worst case: O(n+k)
 *  - if k is way smaller than n, then it'll be O(n)
 *  - if k is way bigger than n, then space cost is too much
 */
export function bucketSort(arr: number[]): void {
  const bucket: number[] = [];
  arr.forEach((element) => {
    if (!bucket[element]) {
      bucket[element] = 0;
    }
    bucket[element]++;
  });
  let i = 0;
  bucket.forEach((elementFrequency, index) => {
    if (elementFrequency) {
      for (let j = 0; j < elementFrequency; j++) {
        arr[i++] = index;
      }
    }
  });
}
