import { BinaryHeap, PriorityComparatorFunc } from './binary-heap';

describe('Binary Heap:', () => {
  const array = [68, 69, 66, 15, 91, 98, 17, 37];

  describe('Max heap:', () => {
    const maxHeapComparator: PriorityComparatorFunc = (a, b) => a > b;

    function checkMaxHeapValidity(heap: BinaryHeap): boolean {
      for (let i = 1; i < heap.treeArray.length - 1; i++) {
        const parent = heap.treeArray[i];
        const leftChild = heap._hasLeftChild(i) ? heap.treeArray[heap._getLeftChildIndex(i)] : -Infinity;
        const rightChild = heap._hasRightChild(i) ? heap.treeArray[heap._getRightChildIndex(i)] : -Infinity;
        if (parent < leftChild || parent < rightChild) {
          return false;
        }
      }
      return true;
    }

    describe('getHighestPriorityData()', () => {
      it('should return null for empty heap', () => {
        const maxHeap = new BinaryHeap(maxHeapComparator);
        expect(maxHeap.getHighestPriorityData()).toBeNull();
      });
    });

    it('should build the heap with 2 different methods', () => {
      const maxHeap1 = BinaryHeap.buildHeap(array, maxHeapComparator);
      expect(checkMaxHeapValidity(maxHeap1)).toBe(true);
      expect(maxHeap1.getHighestPriorityData()).toBe(98);

      // copy array cause it will be mutated in place
      const maxHeap2 = BinaryHeap.buildHeapInPlace([...array], maxHeapComparator);
      expect(checkMaxHeapValidity(maxHeap2)).toBe(true);
      expect(maxHeap2.getHighestPriorityData()).toBe(98);
    });

    describe('insert()', () => {
      it('should insert data correctly', () => {
        const maxHeap = BinaryHeap.buildHeap(array, maxHeapComparator);
        expect(maxHeap.treeArray).toEqual([null, 98, 69, 91, 37, 68, 66, 17, 15]);

        // insert 10 (leaf)
        maxHeap.insert(10);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 69, 91, 37, 68, 66, 17, 15, 10]);

        // insert 80 (middle)
        maxHeap.insert(80);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 80, 91, 37, 69, 66, 17, 15, 10, 68]);

        // insert 100 (root)
        maxHeap.insert(100);
        expect(maxHeap.getHighestPriorityData()).toBe(100);
        expect(maxHeap.treeArray).toEqual([null, 100, 98, 91, 37, 80, 66, 17, 15, 10, 68, 69]);
      });
    });

    describe('delete()', () => {
      it('should delete data correctly', () => {
        const maxHeap = BinaryHeap.buildHeap(array, maxHeapComparator);
        expect(maxHeap.treeArray).toEqual([null, 98, 69, 91, 37, 68, 66, 17, 15]);

        // delete 1 (not exist)
        maxHeap.delete(1);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 69, 91, 37, 68, 66, 17, 15]);

        // delete 15 (last leaf)
        maxHeap.delete(15);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 69, 91, 37, 68, 66, 17]);

        // delete 69 (middle)
        maxHeap.delete(69);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 68, 91, 37, 17, 66]);

        // delete 91 (middle)
        maxHeap.delete(91);
        expect(maxHeap.getHighestPriorityData()).toBe(98);
        expect(maxHeap.treeArray).toEqual([null, 98, 68, 66, 37, 17]);

        // delete 98 (root)
        maxHeap.delete(98);
        expect(maxHeap.getHighestPriorityData()).toBe(68);
        expect(maxHeap.treeArray).toEqual([null, 68, 37, 66, 17]);
      });
    });
  });

  describe('Min heap:', () => {
    const minHeapComparator: PriorityComparatorFunc = (a, b) => b > a;

    function checkMinHeapValidity(heap: BinaryHeap): boolean {
      for (let i = 1; i < heap.treeArray.length - 1; i++) {
        const parent = heap.treeArray[i];
        const leftChild = heap._hasLeftChild(i) ? heap.treeArray[heap._getLeftChildIndex(i)] : Infinity;
        const rightChild = heap._hasRightChild(i) ? heap.treeArray[heap._getRightChildIndex(i)] : Infinity;
        if (parent > leftChild || parent > rightChild) {
          return false;
        }
      }
      return true;
    }

    it('should build the heap with 2 different methods', () => {
      const minHeap1 = BinaryHeap.buildHeap(array, minHeapComparator);
      expect(checkMinHeapValidity(minHeap1)).toBe(true);
      expect(minHeap1.getHighestPriorityData()).toBe(15);

      // copy array cause it will be mutated in place
      const minHeap2 = BinaryHeap.buildHeapInPlace([...array], minHeapComparator);
      expect(checkMinHeapValidity(minHeap2)).toBe(true);
      expect(minHeap2.getHighestPriorityData()).toBe(15);
    });

    describe('insert()', () => {
      it('should insert data correctly', () => {
        const minHeap = BinaryHeap.buildHeap(array, minHeapComparator);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 91, 98, 68, 69]);

        // insert 100 (leaf)
        minHeap.insert(100);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 91, 98, 68, 69, 100]);

        // insert 50 (middle)
        minHeap.insert(50);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 50, 98, 68, 69, 100, 91]);

        // insert 10 (root)
        minHeap.insert(10);
        expect(minHeap.getHighestPriorityData()).toBe(10);
        expect(minHeap.treeArray).toEqual([null, 10, 15, 17, 66, 37, 98, 68, 69, 100, 91, 50]);
      });
    });

    describe('delete()', () => {
      it('should delete data correctly', () => {
        const minHeap = BinaryHeap.buildHeap(array, minHeapComparator);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 91, 98, 68, 69]);

        // delete 1 (not exist)
        minHeap.delete(1);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 91, 98, 68, 69]);

        // delete 69 (last leaf)
        minHeap.delete(69);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 37, 17, 66, 91, 98, 68]);

        // delete 37 (middle)
        minHeap.delete(37);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 66, 17, 68, 91, 98]);

        // delete 66 (middle)
        minHeap.delete(66);
        expect(minHeap.getHighestPriorityData()).toBe(15);
        expect(minHeap.treeArray).toEqual([null, 15, 68, 17, 98, 91]);

        // delete 15 (root)
        minHeap.delete(15);
        expect(minHeap.getHighestPriorityData()).toBe(17);
        expect(minHeap.treeArray).toEqual([null, 17, 68, 91, 98]);
      });
    });
  });
});
