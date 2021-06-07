/**
 * Similar as Binary Tree Node, each node has 2 child nodes, the difference is each node
 * also represents a range in the original array.
 */
export class SegmentTreeNode {
  data: number;
  leftChild: SegmentTreeNode;
  rightChild: SegmentTreeNode;
  /** the start index of the range this node represents */
  startIndex: number;
  /** the end index of the range this node represents */
  endIndex: number;

  constructor(data: number, startIndex: number, endIndex: number) {
    this.data = data;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.leftChild = null;
    this.rightChild = null;
  }
}

export type RangedAggregationFunc = (leftChildData: number, rightChildData: number) => number;

/**
 * Segment Tree:
 *    - similar as Binary Indexed Tree, store aggregated range data on each node, commonly used
 * to calculated ranged sum/min/max
 *    - it's a real tree in term of storage
 *    - only the leaf node will store the actual data from the original array, all the parent nodes
 * will store the ranged aggregation data (RA)
 *
 *                                   RA[0,4]
 *                      /                             \
 *                   RA[0,2]                        RA[3,4]
 *                  /      \                      /        \
 *               RA[0,1]  RA[2,2]              RA[3,3]    RA[4,4]
 *             /        \
 *         RA[0,0]    RA[1,1]
 */
export class SegmentTree {
  /** root node */
  root: SegmentTreeNode;

  /**
   * A function to calculate the ranged aggregation data, it can be sum of the two child nodes,
   * or minimum/maximum value of the two child nodes.
   */
  calcRangedAggregation: RangedAggregationFunc;

  constructor(calcRangedAggregation: RangedAggregationFunc) {
    this.calcRangedAggregation = calcRangedAggregation;
  }

  buildTree(array: number[]): void {
    this.root = _buildTree(array, 0, array.length - 1, this.calcRangedAggregation);
  }

  update(index: number, data: number): void {
    _update(this.root, index, data, this.calcRangedAggregation);
  }

  queryRangedAggregation(startIndex: number, endIndex: number): ReturnType<RangedAggregationFunc> {
    return _queryRangedAggregation(this.root, startIndex, endIndex, this.calcRangedAggregation);
  }
}

/**
 * Build a tree node for range [startIndex, endIndex]:
 *    - if startIndex === endIndex, leaf node, use the original array data to create node
 *    - if not, recursively build tree node for left sub range and right sub range
 *    - return root node finally
 *
 * Time: O(n)
 */
function _buildTree(
  array: number[],
  startIndex: number,
  endIndex: number,
  calcRangedAggregation: RangedAggregationFunc,
): SegmentTreeNode {
  if (startIndex === endIndex) {
    return new SegmentTreeNode(array[startIndex], startIndex, endIndex);
  }
  const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
  const leftChild = _buildTree(array, startIndex, middleIndex, calcRangedAggregation);
  const rightChild = _buildTree(array, middleIndex + 1, endIndex, calcRangedAggregation);
  const data = calcRangedAggregation(leftChild.data, rightChild.data);
  const newNode = new SegmentTreeNode(data, startIndex, endIndex);
  newNode.leftChild = leftChild;
  newNode.rightChild = rightChild;
  return newNode;
}

/**
 * Search from the root node:
 *    - if the correct leaf node is found, update data
 *    - if not, check the middle index of this node's range:
 *        a) if the `index` is less than the middle index, which means the leaf node is
 * at current node's left sub tree.
 *        b) if not, check the right sub tree.
 *    - remember to update the parent node value after
 *
 * Time: O(log(n)) - split the range to 2 sections every time
 */
function _update(
  node: SegmentTreeNode,
  index: number,
  data: number,
  calcRangedAggregation: RangedAggregationFunc,
): void {
  if (node.startIndex === node.endIndex && node.startIndex === index) {
    // find the correct leaf node
    node.data = data;
    return;
  }
  const middleIndex = node.startIndex + Math.floor((node.endIndex - node.startIndex) / 2);
  // equal to `middleIndex` -> left
  if (index <= middleIndex) {
    _update(node.leftChild, index, data, calcRangedAggregation);
  } else {
    _update(node.rightChild, index, data, calcRangedAggregation);
  }
  // update for the node has been finished already, need to update its parent node
  node.data = calcRangedAggregation(node.leftChild.data, node.rightChild.data);
}

/**
 * Search from root node:
 *    - if the correct range is matched with the node, return the node data directly
 *    - if not, check the middle index of this node's range:
 *        a) if the `endIndex` is less than the middle index, which means the range is
 * at current node's left sub tree
 *        b) if the `startIndex` is larger than the middle index, which means the range
 * is at current node's right sub tree
 *        c) if not, which means the range is split, we need to query it separately, e.g.
 * [startIndex, middleIndex], [middleIndex + 1, endIndex]
 *
 * Time: O(log(n) + k) - split the range to 2 sections every time, k is related to c)
 */
function _queryRangedAggregation(
  node: SegmentTreeNode,
  startIndex: number,
  endIndex: number,
  calcRangedAggregation: RangedAggregationFunc,
): ReturnType<RangedAggregationFunc> {
  if (node.startIndex === startIndex && node.endIndex === endIndex) {
    // find the correct range node
    return node.data;
  }
  const middleIndex = node.startIndex + Math.floor((node.endIndex - node.startIndex) / 2);
  // completely on left side
  if (endIndex <= middleIndex) {
    return _queryRangedAggregation(node.leftChild, startIndex, endIndex, calcRangedAggregation);
  }
  // completely on right side
  if (startIndex > middleIndex) {
    return _queryRangedAggregation(node.rightChild, startIndex, endIndex, calcRangedAggregation);
  }
  // middleIndex is inside [startIndex, endIndex]
  const leftAggregation = _queryRangedAggregation(node.leftChild, startIndex, middleIndex, calcRangedAggregation);
  const rightAggregation = _queryRangedAggregation(node.rightChild, middleIndex + 1, endIndex, calcRangedAggregation);
  return calcRangedAggregation(leftAggregation, rightAggregation);
}
