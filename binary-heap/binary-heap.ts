import { swap } from '../_util';

/**
 * Priority comparator function: used to decide which element has higher priority, return true
 * if first element has higher priority then the second one.
 */
export type PriorityComparatorFunc<TDataType> = (a: TDataType, b: TDataType) => boolean;

/**
 * Binary max/min heap:
 *    - commonly used in scenarios when we want to get max/min items in an array with O(1) even
 * with multiple insert/delete
 *    - a complete binary tree structure stored in an array
 *    - root node always has the maximum/minimum value, parent nodes are always larger/smaller
 * than child nodes
 *    - can be used to model a Priority Queue, every item in the queue has different priority,
 * when `dequeue()`, the item with highest priority will be removed first, if there are multiple
 * items with the same priority, fall back to FIFO
 *
 *                         10
 *                    /         \
 *                   8          6
 *                 /   \       /
 *                5     4     3
 *
 * the above heap will be saved in array [0, 10, 8, 6, 5, 4, 3] (binary tree BFS array), leaving
 * index 0 as empty to ensure: given index t, its left child index is t*2, right child index is
 * t*2+1, its parent index is Math.floor(t/2). [ease index calculation]
 */
export class BinaryHeap<TDataType> {
  /**
   * The actual array which stores the heap, for heaps which has n elements,
   * the array size will be n+1 cause index 0 does not store anything.
   */
  treeArray: TDataType[] = [null];

  priorityComparatorFunc: PriorityComparatorFunc<TDataType>;

  constructor(priorityComparatorFunc: PriorityComparatorFunc<TDataType>) {
    this.priorityComparatorFunc = priorityComparatorFunc;
  }

  /**
   * O(nlog(n))
   *
   * For each element in the array, insert it into the heap.
   */
  static buildHeap<TDataType>(
    array: TDataType[],
    priorityComparatorFunc: PriorityComparatorFunc<TDataType>,
  ): BinaryHeap<TDataType> {
    const heap = new BinaryHeap(priorityComparatorFunc);
    array.forEach((item) => {
      heap.insert(item);
    });
    return heap;
  }

  /**
   * O(n)
   *
   * Construct the heap in place with the array (modify the array directly):
   *    a) insert null as its first element
   *    b) staring from the last parent node, do `_siftDown()`
   *
   * There's strict mathematical proof of the time complexity equals to O(n) with
   * Taylor series, the intuitive understanding is: the complexity of "_siftUp()"
   * and "_siftDown()" depends on the distance of the node to the top/bottom:
   *    - for "_siftUp()", it's the distance to the top of the tree, the closer it
   * is to the top, the less comparison/swap is needed, so it's more efficient for
   * nodes in the top of the tree.
   *    - for "_siftDown()", it's the distance to the bottom of the tree, the closer
   * it is to the bottom, the less comparison/swap is needed, so it's more efficient
   * for nodes in the bottom of the tree.
   * Take this fact into consideration: there is only 1 root node and majority of the
   * nodes are in the bottom for the tree, so if we use "_siftDown()" completely to
   * build a heap, it will be more efficient.
   */
  static buildHeapInPlace<TDataType>(
    array: TDataType[],
    priorityComparatorFunc: PriorityComparatorFunc<TDataType>,
  ): BinaryHeap<TDataType> {
    array.unshift(null);
    const heap = new BinaryHeap(priorityComparatorFunc);
    heap.treeArray = array;
    for (let i = Math.floor(array.length - 1 / 2); i > 0; i--) {
      heap._siftDown(i);
    }
    return heap;
  }

  _getParentIndex(index: number): number {
    return Math.floor(index / 2);
  }

  _hasParent(index: number): boolean {
    return this._getParentIndex(index) > 0;
  }

  _getLeftChildIndex(index: number): number {
    return index * 2;
  }

  _hasLeftChild(index: number): boolean {
    return this._getLeftChildIndex(index) < this.treeArray.length;
  }

  _getRightChildIndex(index: number): number {
    return index * 2 + 1;
  }

  _hasRightChild(index: number): boolean {
    return this._getRightChildIndex(index) < this.treeArray.length;
  }

  /**
   *
   * Compare `index` with its parent, if it doesn't satisfy the heap property (e.g. larger
   * then its parent for max heap), then swap it, until reach the root.
   */
  _siftUp(index: number): void {
    while (this._hasParent(index)) {
      const parentIndex = this._getParentIndex(index);
      if (this.priorityComparatorFunc(this.treeArray[index], this.treeArray[parentIndex])) {
        swap(this.treeArray, index, parentIndex);
        index = parentIndex;
      } else {
        // once no swap is required, break the loop cause no need to compare upward anymore
        break;
      }
    }
  }

  /**
   *
   * Compare `index` with its children, if doesn't satisfy the heap property (e.g. smaller
   * then its children for max heap), then swap it with the larger child, until reach the end.
   */
  _siftDown(index: number): void {
    /**
     * To check if this node has children, checking left child existence is enough here,
     * cause complete binary tree can't only have right child.
     */
    while (this._hasLeftChild(index)) {
      const leftChildIndex = this._getLeftChildIndex(index);
      const rightChildIndex = this._getRightChildIndex(index);
      let higherPriorityChildIndex = leftChildIndex;
      if (
        this._hasRightChild(index) &&
        this.priorityComparatorFunc(this.treeArray[rightChildIndex], this.treeArray[leftChildIndex])
      ) {
        higherPriorityChildIndex = rightChildIndex;
      }
      if (this.priorityComparatorFunc(this.treeArray[higherPriorityChildIndex], this.treeArray[index])) {
        swap(this.treeArray, index, higherPriorityChildIndex);
        index = higherPriorityChildIndex;
      } else {
        // once no swap is required, break the loop cause no need to compare upward anymore
        break;
      }
    }
  }

  isEmpty(): boolean {
    return this.treeArray.length <= 1;
  }

  /**
   * O(log(n))
   *
   * Insert the `data` to the last node of the tree (push to array), then
   * compare it with its parent to adjust its position through `_siftUp()`.
   */
  insert(data: TDataType): void {
    this.treeArray.push(data);
    this._siftUp(this.treeArray.length - 1);
  }

  /**
   * O(n)
   *
   * Find the `data` in the tree and return its index.
   */
  private _findIndex(data: TDataType, customEqual?: (data1: TDataType, data2: TDataType) => boolean): number {
    for (let i = 1; i < this.treeArray.length; i++) {
      if (customEqual) {
        if (customEqual(this.treeArray[i], data)) {
          return i;
        }
      } else {
        if (this.treeArray[i] === data) {
          return i;
        }
      }
    }
    return -1;
  }

  /**
   * O(log(n))
   *
   * Replace the `index` with the last node of the tree (last element in the array),
   * then compare it with its children to adjust its position through `_siftDown()`.
   */
  private _deleteIndex(index: number): void {
    if (index === this.treeArray.length - 1) {
      this.treeArray.pop();
    } else {
      const last = this.treeArray.pop();
      this.treeArray[index] = last;
      this._siftDown(index);
    }
  }

  /**
   * O(n)
   *
   * Delete the `data`, find it first via `_find` then delete it via `_deleteIndex`.
   *
   * Note: for custom `TDataType`, pass the `customEqual` as 2nd parameter so we can
   * use that function to do custom logic to check equality for two items.
   */
  delete(data: TDataType, customEqual?: (data1: TDataType, data2: TDataType) => boolean): void {
    const index = this._findIndex(data, customEqual);
    if (index === -1) {
      return;
    }
    this._deleteIndex(index);
  }

  /** O(1) - return the root node directly */
  getHighestPriorityData(): TDataType {
    if (this.isEmpty()) {
      return null;
    }
    return this.treeArray[1];
  }
}
