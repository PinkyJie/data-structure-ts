/**
 * Binary Indexed Tree (Fenwick Tree):
 *    - commonly used to solve the prefix sum of an array, given an array of n elements, binary
 * indexed tree can help solve sum(0...k) [summation from element 0 to k] efficiently.
 *    - the difference from "prefix sum array": an array holds summation of prefix [Sum(0), Sum(0...1),
 * Sum(0...2), ...] can also solve the same problem, but if the original array elements get updated
 * frequently, the performance of binary indexed tree is much better. The "prefix sum array" needs
 * to update every range sum if element 0 changes (O(n)), while for binary indexed tree, the
 * update only takes O(log(n)). The main idea behind this is to store ranged sum on each tree node,
 * so if one element is updated in the original array, only limited number of tree nodes need to
 * update.
 *    - it's not a real tree structure in storage, it's just an array with (n+1) elements, 1 more
 * element than the original array in term of space because index 0 is the dummy node, index 1~n
 * will store the actual prefix sum.
 *
 * Note: we will use `array index` to represent the original array index 0 ~ (n-1), and use `node index`
 * to represent the index for the binary indexed tree storage array index. NodeIndex = ArrayIndex + 1.
 *
 * How to get the parent-child relationship?
 *    - use node index's binary representation and flip its rightmost set bit (the right most 1)
 * to 0, then we get the parent node index in the tree.
 *
 *                 0                      index |   binary  |  flip rightmost set bit
 *        /    /      \     \               1          1                  0 -> 0
 *       1     2      4      8              4          100                0 -> 0
 *             |     / \    / \             5        101                100 -> 4
 *             3    5   6  9  10            7        111                110 -> 6
 *                      |      |            9       1001               1000 -> 8
 *                      7     11            11      1011               1010 -> 10
 *
 * What's the value inside the node?
 *    - node 0's value is 0, it doesn't store anything
 *    - for other nodes, the value is Sum[parentNodeIndex...nodeIndex) e.g. from the parent node index
 * to itself, but not including the ending node index
 *      - node 4's value is Sum[0...4) = value of array index 0 + value of array index 1 +
 * value of array index 2 + value of array index 3
 *      - node 6's value is Sum[4...6) = value of array index 4 + value of array index 5
 *
 *                           0
 *        /         /           \               \
 *       1[0,1)    2[0,2)        4[0,4)          8[0,8)
 *                 |            /     \         /     \
 *                 3[2,3)      5[4,5)  6[4,6)  9[8,9)  10[8,10)
 *                                     |               |
 *                                     7[6,7)          11[10,11)
 *
 * How it helps for prefix sum?
 *    - in order to calculate the prefix sum for array index 5, we find the corresponding node in the
 * tree (node 6), and find all its parent nodes up until root, and add them together, e.g. the prefix sum
 * wil be: value of node 6 + value of node 4 + value of node 0.
 */
export class BinaryIndexedTree {
  /**
   * Binary indexed tree is actually stored inside an array. By default the array is empty,
   * in order to put the original array (the array which we need to calculate prefix sum for)
   * to the tree, we need to call `update()` below for each element in the array.
   */
  treeArray: number[];

  /**
   * To build a binary indexed tree from an array, call `update()` below for each element
   * to insert the element in the tree. Treat it as: by default all element in the array
   * is 0, we update each element with their real value by calling `update()`.
   * Time: O(nlog(n))
   */
  buildTree(array: number[]): void {
    this.treeArray = new Array(array.length + 1).fill(0);
    array.forEach((item, index) => this.update(index, item));
  }

  /**
   * Update the tree when we change the value of `arrayIndex` from the original array.
   * Time: O(log(n))
   *
   * To update `arrayIndex` to a new value, we need to know all the nodes affected by
   * this update. Take the above tree sample as an example:
   *    - if we update node 1, nodes 2,4,8 are affected and need to be updated
   *    - if we update node 5, nodes 6,8 are affected and need to be updated
   *
   * @param diff the difference between the original value and the new value
   */
  update(arrayIndex: number, diff: number): void {
    let nodeIndex = arrayIndex + 1;
    while (nodeIndex < this.treeArray.length) {
      this.treeArray[nodeIndex] += diff;
      nodeIndex = _getNextAffectedNodeIndex(nodeIndex);
    }
  }

  /**
   * Query the prefix sum, return the sum of elements from 0 to `arrayIndex` (inclusive).
   * Time: O(log(n))
   */
  queryPrefixSum(arrayIndex: number): number {
    let sum = 0;
    let nodeIndex = arrayIndex + 1;
    while (nodeIndex > 0) {
      sum += this.treeArray[nodeIndex];
      nodeIndex = _getParentNodeIndex(nodeIndex);
    }
    return sum;
  }

  /**
   * Return the ranged sum from `startArrayIndex` to `endArrayIndex` (inclusive).
   */
  queryRangeSum(startArrayIndex: number, endArrayIndex: number): number {
    // use prefix Sum(0, end) - Sum(0, start - 1)
    return this.queryPrefixSum(endArrayIndex) - this.queryPrefixSum(startArrayIndex - 1);
  }
}

/**
 * To get parent node index:
 *  1) 2's complement of the node index (inverting the digits and adding one)
 *  2) bitwise AND(&) 1) with the node index
 *  3) subtract 2) from the node index
 *
 *   index  |  binary  | 2's complement    | bitwise AND with index |  subtract
 *     1        1        0     + 1 -> 1      1    & 1    -> 1          1 - 1 -> 0
 *     4        100      011   + 1 -> 100    100  & 100  -> 100 (4)    4 - 4 -> 0
 *     5        101      010   + 1 -> 011    101  & 011  -> 1          5 - 1 -> 4
 *     7        111      000   + 1 -> 001    111  & 001  -> 1          7 - 1 -> 6
 *     10       1010     0101  + 1 -> 0110   1010 & 0110 -> 10 (2)    10 - 2 -> 8
 *     11       1011     0100  + 1 -> 0101   1011 & 0101 -> 1         11 - 1 -> 10
 */
function _getParentNodeIndex(nodeIndex: number): number {
  return nodeIndex - (nodeIndex & -nodeIndex);
}

/**
 * To get the next affected node index:
 *  1) 2's complement of the node index
 *  2) AND(&) 1) with the node index
 *  3) add 2) to the node index
 *
 *   index  |  binary  | 2's complement    | bitwise AND with index |  add
 *     1        1        0     + 1 -> 1      1    & 1    -> 1          1 + 1 -> 2
 *     4        100      011   + 1 -> 100    100  & 100  -> 100 (4)    4 + 4 -> 8
 *     5        101      010   + 1 -> 011    101  & 011  -> 1          5 + 1 -> 6
 *     7        111      000   + 1 -> 001    111  & 001  -> 1          7 + 1 -> 8
 *     10       1010     0101  + 1 -> 0110   1010 & 0110 -> 10 (2)    10 + 2 -> 12
 *     11       1011     0100  + 1 -> 0101   1011 & 0101 -> 1         11 + 1 -> 12
 */
function _getNextAffectedNodeIndex(nodeIndex: number): number {
  return nodeIndex + (nodeIndex & -nodeIndex);
}
