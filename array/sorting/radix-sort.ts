/**
 * Radix Sort
 * A non-comparison sorting method
 * https://www.youtube.com/watch?v=XiuSW_mEn7g
 *
 * Compare the numbers digit-by-digit (radix):
 * [ 53, 89, 150, 36, 633, 233 ]
 * For each digit, use a stable sorting method (e.g. counting sort) to sort the array
 * by that position (if that position has no digit, treat it as 0):
 * 1st round (compare the last digit):         150, 53,  633, 233, 36,  89
 * 2nd round (compare the 2nd last digit):     633, 233, 36,  150, 53,  89
 * 3rd round (compare the 3rd last digit):     36,  53,  89,  150, 233, 633
 * The key here is to use stable sorting for each digit, so the position can be kept.
 *
 * Note: we can also choose different base (e.g. 100), so the splitting will be different,
 * if we choose the "max digits" as base (e.g. for the above example use 1000), then radix
 * sort is no difference with counting sort, because `d` will be 1.
 *
 * Time: O(d(n + b)) - d: how many digits after radix split, b: the base, (n + b) is
 * actually the complexity of counting sort we use
 * Space: O(nb) - the bucket
 * Best/Worst case: O(d(n + b)
 *  - larger base (b) will get smaller count of digits (d), smaller base will get larger
 * count of digits, trade-off of time/space complexity
 */
export function radixSort(arr: number[]): void {
  const base = 10;
  const maxDigits = getMaxDigits(arr);
  for (let d = 0; d <= maxDigits; d++) {
    // for each digit do counting sort
    const buckets = new Array(base).fill(0).map(() => []);
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigitAt(arr[i], d);
      buckets[digit].push(arr[i]);
    }
    let start = 0;
    for (let i = 0; i < buckets.length; i++) {
      buckets[i].forEach((num) => {
        arr[start++] = num;
      });
    }
  }
}

function getMaxDigits(arr: number[]): number {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, arr[i].toString().length);
  }
  return maxDigits;
}

function getDigitAt(num: number, rightIndex: number): number {
  const str = num.toString();
  if (rightIndex > str.length - 1) {
    return 0;
  }
  return parseInt(str[str.length - 1 - rightIndex]);
}
