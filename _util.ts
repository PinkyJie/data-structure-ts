export function swap<TArrayDataType = number>(arr: TArrayDataType[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
