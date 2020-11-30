import { swap } from '../_util';

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
 *
 */
export class BinaryHeap<TDataType> {
  /**
   * The actual array which stores the heap, for heaps which has n elements,
   * the array size will be n+1 cause index 0 does not store anything.
   */
  treeArray: TDataType[] = [null];

  /**
   * A map to get the `treeArray` index by the `data`, especially useful for
   * searching.
   * Note: this can't handle duplicate items inside the Heap.
   */
  private _dataMap: {
    [idOfData: string]: number;
  } = {};

  /** For complex `data` stored in the heap, this function is used to get an id from
   * the `data`, so we can use the id as the key of the `_dataMap`.
   */
  private _getIdFromData: (data: TDataType) => number | string;

  /**
   * Priority comparator function: used to decide which element has higher priority,
   * return true if first element has higher priority than the second one.
   */
  private _priorityComparatorFunc: PriorityComparatorFunc<TDataType>;

  constructor(
    priorityComparatorFunc: PriorityComparatorFunc<TDataType>,
    getIdFromData: (data: TDataType) => number | string = (data): string => data.toString(),
  ) {
    this._priorityComparatorFunc = priorityComparatorFunc;
    this._getIdFromData = getIdFromData;
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
      heap.push(item);
    });
    return heap;
  }

  /**
   * O(n)
   *
   * Construct the heap in place with the array (modify the array directly):
   *    a) insert null as its first element
   *    b) staring from the last parent node, do `_heapifyDown()`
   *
   * There's a strict mathematical proof of the time complexity equals to O(n) with
   * Taylor series, the intuitive understanding is: the complexity of "_heapifyUp()"
   * and "_heapifyDown()" depends on the distance of the node to the top/bottom:
   *    - for "_heapifyUp()", it's the distance to the top of the tree, the closer it
   * is to the top, the less comparison/swap is needed, so it's more efficient for
   * nodes in the top of the tree.
   *    - for "_heapifyDown()", it's the distance to the bottom of the tree, the closer
   * it is to the bottom, the less comparison/swap is needed, so it's more efficient
   * for nodes in the bottom of the tree.
   * Take this fact into consideration: there is only 1 root node and majority of the
   * nodes are in the bottom for the tree, so if we use "_heapifyDown()" completely to
   * build a heap, it will be more efficient.
   */
  static buildHeapInPlace<TDataType>(
    array: TDataType[],
    priorityComparatorFunc: PriorityComparatorFunc<TDataType>,
  ): BinaryHeap<TDataType> {
    array.unshift(null);
    const heap = new BinaryHeap(priorityComparatorFunc);
    heap.treeArray = array;
    for (let i = Math.floor(array.length / 2); i > 0; i--) {
      heap._heapifyDown(i);
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
   * than its parent for max heap), then swap it, until reach the root.
   */
  _heapifyUp(index: number): void {
    while (this._hasParent(index)) {
      const parentIndex = this._getParentIndex(index);
      if (this._priorityComparatorFunc(this.treeArray[index], this.treeArray[parentIndex])) {
        this._dataMap[this._getIdFromData(this.treeArray[index])] = parentIndex;
        this._dataMap[this._getIdFromData(this.treeArray[parentIndex])] = index;
        swap(this.treeArray, index, parentIndex);
        index = parentIndex;
      } else {
        // once no swap is required, break the loop cause no need to compare upwards anymore
        break;
      }
    }
  }

  /**
   *
   * Compare `index` with its children, if doesn't satisfy the heap property (e.g. smaller
   * than its children for max heap), then swap it with the larger child, until reach the end.
   */
  _heapifyDown(index: number): void {
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
        this._priorityComparatorFunc(this.treeArray[rightChildIndex], this.treeArray[leftChildIndex])
      ) {
        higherPriorityChildIndex = rightChildIndex;
      }
      if (this._priorityComparatorFunc(this.treeArray[higherPriorityChildIndex], this.treeArray[index])) {
        this._dataMap[this._getIdFromData(this.treeArray[index])] = higherPriorityChildIndex;
        this._dataMap[this._getIdFromData(this.treeArray[higherPriorityChildIndex])] = index;
        swap(this.treeArray, index, higherPriorityChildIndex);
        index = higherPriorityChildIndex;
      } else {
        // once no swap is required, break the loop cause no need to compare downwards anymore
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
   * compare it with its parent to adjust its position through `_heapifyUp()`.
   */
  push(data: TDataType): void {
    this.treeArray.push(data);
    this._dataMap[this._getIdFromData(data)] = this.treeArray.length - 1;
    this._heapifyUp(this.treeArray.length - 1);
  }

  /**
   * O(log(n))
   *
   * Remove the top node from the tree.
   */
  pop(): TDataType {
    const top = this.peek();
    this._deleteIndex(1);
    return top;
  }

  /**
   * O(1)
   *
   * Find the `data` in the `treeArray` and return its index.
   *
   * If we don't maintain `_dataMap`, finding the data's index in the `treeArray`
   * is done by a linear search which will cost O(n). With the help of maintaining
   * this `_dataMap`, we can get the `index` by O(1), the down side is, every time
   * we do `heapifyUp/heapifyDown` we need to update this map.
   */
  findIndex(data: TDataType): number {
    return this._dataMap[this._getIdFromData(data)] ?? -1;
  }

  find(idOfData: number | string): TDataType {
    if (this._dataMap[idOfData]) {
      return this.treeArray[this._dataMap[idOfData]];
    }
    return null;
  }

  /**
   * O(log(n))
   *
   * Replace the `index` with the last node of the tree (last element in the array),
   * then compare it with either parent or children to adjust its position respectively.
   */
  private _deleteIndex(index: number): void {
    if (index === this.treeArray.length - 1) {
      const deletedItem = this.treeArray.pop();
      delete this._dataMap[this._getIdFromData(deletedItem)];
    } else {
      const last = this.treeArray.pop();
      delete this._dataMap[this._getIdFromData(this.treeArray[index])];
      this.treeArray[index] = last;
      this._dataMap[this._getIdFromData(last)] = index;
      /**
       * If the deletion happens in the middle of the tree, after replacing the last tree
       * node to the deleted `index`, the new number can be larger than parent, so we need
       * to check here, if it has higher priority than its parent, then do heapify up, otherwise
       * do heapify down.
       *
       * Take this min heap as an example:
       *                         1
       *                    /         \
       *                   5          15
       *                 /   \       /  \
       *                9    11     18  20
       *               / \
       *              17  12
       *
       *  * if we are deleting 5, 12 will be moved to the left child of node 1, it's larger than
       * its both children, so need to do heapify down
       *  * if we are deleting 18, 12 will be moved to the right child of node 1, it's smaller
       * than its parent, so need to do heapify up
       *
       */
      if (this._hasParent(index) && this._priorityComparatorFunc(last, this.treeArray[this._getParentIndex(index)])) {
        this._heapifyUp(index);
      } else {
        this._heapifyDown(index);
      }
    }
  }

  /**
   * O(log(n))
   *
   * Delete the `data`, find it first via `_find` then delete it via `_deleteIndex`.
   */
  delete(data: TDataType): void {
    const index = this.findIndex(data);
    if (index === -1) {
      return;
    }
    this._deleteIndex(index);
  }

  /** O(1) - return the root node directly */
  peek(): TDataType {
    if (this.isEmpty()) {
      return null;
    }
    return this.treeArray[1];
  }
}
