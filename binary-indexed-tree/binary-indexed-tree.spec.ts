import { BinaryIndexedTree } from './binary-indexed-tree';

describe('Binary indexed tree:', () => {
  function checkAllPrefixSum(array: number[], binaryIndexedTree: BinaryIndexedTree): void {
    let expectedSum = 0;
    array.forEach((item, index) => {
      expectedSum += item;
      expect(binaryIndexedTree.queryPrefixSum(index)).toBe(expectedSum);
    });
  }

  it('should calculate ranged sum correctly', () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const binaryIndexedTree = new BinaryIndexedTree();
    binaryIndexedTree.buildTree(array);

    // default prefix sum
    checkAllPrefixSum(array, binaryIndexedTree);

    // range sum
    expect(binaryIndexedTree.queryRangeSum(2, 5)).toBe(2 + 3 + 4 + 5);
    expect(binaryIndexedTree.queryRangeSum(1, 4)).toBe(1 + 2 + 3 + 4);
    expect(binaryIndexedTree.queryRangeSum(6, 7)).toBe(6 + 7);
    expect(binaryIndexedTree.queryRangeSum(3, 8)).toBe(3 + 4 + 5 + 6 + 7 + 8);

    // update index 3 to value 13
    array[3] = 13;
    binaryIndexedTree.update(3, 13 - 3);
    checkAllPrefixSum(array, binaryIndexedTree);
    expect(binaryIndexedTree.queryRangeSum(6, 7)).toBe(6 + 7);
    expect(binaryIndexedTree.queryRangeSum(3, 8)).toBe(13 + 4 + 5 + 6 + 7 + 8);

    // update index 5 to value 15
    array[5] = 15;
    binaryIndexedTree.update(5, 15 - 5);
    checkAllPrefixSum(array, binaryIndexedTree);
    expect(binaryIndexedTree.queryRangeSum(0, 3)).toBe(0 + 1 + 2 + 13);
    expect(binaryIndexedTree.queryRangeSum(3, 8)).toBe(13 + 4 + 15 + 6 + 7 + 8);
  });
});
