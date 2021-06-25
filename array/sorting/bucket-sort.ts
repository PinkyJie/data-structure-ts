import { insertionSort } from './insertion-sort';

/**
 * Bucket Sort
 * A non-comparison sorting method: split the whole array into multiple buckets based
 * on curtain rule, and then apply insertion sort on each bucket, finally combine all
 * buckets together.
 * https://www.youtube.com/watch?v=geVyIsFpxUs
 *
 * Time: O(n+k) - k is the count of the buckets
 * Space: O(n+k) - k for buckets, total n numbers in all buckets
 * Best case: O(n+k) - numbers are equally assigned to each bucket
 * Worst case: O(n^2) - all numbers are being assigned to the same bucket, fall back
 * to insertion sort.
 *
 */
export function bucketSort(arr: number[], k: number): void {
  /**
   * The splitting rule: find the minimum and the maximum numbers in the array, so
   * we can get a range [min, max], then use
   * `divider = Math.ceil( (maximum - minimum + 1) / bucket count )`
   * then we an assign `arr[i]` to the bucket with index
   * `Math.floor( (arr[i] - minimum) / divider )`.
   * For example: if we have 10 numbers with `maximum = 100` and `minimum = 20`, then
   * we have `divider = ceil( (100 - 20 + 1) / 10 ) = 9`, so number `23` will be assigned
   * to bucket index 0 (because we have`(23 - 20) / 9 = 0`), similarly `33` will be assigned to
   * index 1, and 98 will be assigned to index 8.
   */
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(max, arr[i]);
    min = Math.min(min, arr[i]);
  }
  const divider = Math.ceil((max - min + 1) / k);
  const buckets = new Array(k).fill(0).map(() => []);
  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor((arr[i] - min) / divider);
    buckets[index].push(arr[i]);
  }
  let i = 0;
  for (let j = 0; j < k; j++) {
    if (buckets[j].length > 0) {
      insertionSort(buckets[j]);
      buckets[j].forEach((num) => {
        arr[i++] = num;
      });
    }
  }
}
