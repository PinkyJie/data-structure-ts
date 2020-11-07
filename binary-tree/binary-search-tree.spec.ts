import { BinarySearchTree } from './binary-search-tree';

describe('Binary search tree:', () => {
  const treeSamples = [
    [85, 54, 87, 34, 59, null, null, 19, 50, null, 84, null, null, null, 52, 61],
    // left skewed tree
    [9, 7, null, 5, null, 3, null, 1],
    // right skewed tree
    [1, null, 3, null, 5, null, 7, null, 9],
  ];

  describe('search():', () => {
    it.each<[string, { treeIndex: number; target: number; result: number }]>([
      ['which is the root node', { treeIndex: 0, target: 85, result: 85 }],
      ['which is the root node (left skewed tree)', { treeIndex: 1, target: 9, result: 9 }],
      ['which is the root node (right skewed tree)', { treeIndex: 2, target: 1, result: 1 }],
      ['which is a middle node 1', { treeIndex: 0, target: 50, result: 50 }],
      ['which is a middle node (left skewed tree)', { treeIndex: 1, target: 5, result: 5 }],
      ['which is a middle node (right skewed tree)', { treeIndex: 2, target: 5, result: 5 }],
      ['which is a leaf node', { treeIndex: 0, target: 61, result: 61 }],
      ['which is a leaf node (left skewed tree)', { treeIndex: 1, target: 1, result: 1 }],
      ['which is a leaf node (right skewed tree)', { treeIndex: 2, target: 9, result: 9 }],
      ['which is not existed', { treeIndex: 0, target: 123, result: null }],
      ['which is not existed (left skewed tree)', { treeIndex: 1, target: 123, result: null }],
      ['which is not existed (right skewed tree)', { treeIndex: 2, target: 123, result: null }],
    ])('should search node %s', (_, { treeIndex, target, result }) => {
      const tree = BinarySearchTree.fromArrayBFS(treeSamples[treeIndex]);
      const binarySearchTree = BinarySearchTree.fromBinaryTree(tree);
      if (result === null) {
        expect(binarySearchTree.search(target)).toBeNull();
      } else {
        expect(binarySearchTree.search(target).data).toBe(result);
      }
    });
  });

  describe('insert():', () => {
    it.each<[string, { treeIndex: number; nodeToInsert: number; result: number[] }]>([
      [
        'at the right sub tree (left skewed tree)',
        { treeIndex: 1, nodeToInsert: 10, result: [9, 7, 10, 5, null, null, null, 3, null, 1] },
      ],
      [
        'at the left sub tree (right skewed tree)',
        { treeIndex: 2, nodeToInsert: 0, result: [1, 0, 3, null, null, null, 5, null, 7, null, 9] },
      ],
      [
        'at the middle 1',
        {
          treeIndex: 0,
          nodeToInsert: 55,
          result: [85, 54, 87, 34, 59, null, null, 19, 50, 55, 84, null, null, null, 52, null, null, 61],
        },
      ],
      [
        'at the middle 2',
        {
          treeIndex: 0,
          nodeToInsert: 45,
          result: [85, 54, 87, 34, 59, null, null, 19, 50, null, 84, null, null, 45, 52, 61],
        },
      ],
      [
        'at the middle (left skewed tree)',
        { treeIndex: 1, nodeToInsert: 4, result: [9, 7, null, 5, null, 3, null, 1, 4] },
      ],
      [
        'at the middle (right skewed tree)',
        { treeIndex: 2, nodeToInsert: 4, result: [1, null, 3, null, 5, 4, 7, null, null, null, 9] },
      ],
      [
        'at the leaf 1',
        {
          treeIndex: 0,
          nodeToInsert: 15,
          result: [85, 54, 87, 34, 59, null, null, 19, 50, null, 84, 15, null, null, 52, 61],
        },
      ],
      [
        'at the leaf 2',
        {
          treeIndex: 0,
          nodeToInsert: 90,
          result: [85, 54, 87, 34, 59, null, 90, 19, 50, null, 84, null, null, null, null, null, 52, 61],
        },
      ],
      [
        'at the leaf (left skewed tree)',
        { treeIndex: 1, nodeToInsert: 0, result: [9, 7, null, 5, null, 3, null, 1, null, 0] },
      ],
      [
        'at the leaf (right skewed tree)',
        { treeIndex: 2, nodeToInsert: 10, result: [1, null, 3, null, 5, null, 7, null, 9, null, 10] },
      ],
    ])('should insert a node %s', (_, { treeIndex, nodeToInsert, result }) => {
      const tree = BinarySearchTree.fromArrayBFS(treeSamples[treeIndex]);
      const binarySearchTree = BinarySearchTree.fromBinaryTree(tree);
      binarySearchTree.insert(nodeToInsert);
      expect(binarySearchTree.toArrayBFS()).toEqual(result);
    });
  });

  describe('delete():', () => {
    it.each<[string, { nodeToDelete: number; resultTree: number[] }]>([
      [
        'which is root node',
        {
          nodeToDelete: 10,
          resultTree: [9, 7, 12, 3, 8, null, 20, null, 4, null, null, 15, null, null, 6, 13, 16, 5],
        },
      ],
      [
        'which is a leaf node 1',
        {
          nodeToDelete: 5,
          resultTree: [10, 7, 12, 3, 8, null, 20, null, 4, null, 9, 15, null, null, 6, null, null, 13, 16],
        },
      ],
      [
        'which is a leaf node 2',
        {
          nodeToDelete: 16,
          resultTree: [10, 7, 12, 3, 8, null, 20, null, 4, null, 9, 15, null, null, 6, null, null, 13, null, 5],
        },
      ],
      [
        'which has only left child',
        {
          nodeToDelete: 20,
          resultTree: [
            10,
            7,
            12,
            3,
            8,
            null,
            15,
            null,
            4,
            null,
            9,
            13,
            16,
            null,
            6,
            null,
            null,
            null,
            null,
            null,
            null,
            5,
          ],
        },
      ],
      [
        'which has only right child',
        {
          nodeToDelete: 3,
          resultTree: [10, 7, 12, 4, 8, null, 20, null, 6, null, 9, 15, null, 5, null, null, null, 13, 16],
        },
      ],
      [
        'which has both left/right child',
        {
          nodeToDelete: 7,
          resultTree: [10, 6, 12, 3, 8, null, 20, null, 4, null, 9, 15, null, null, 5, null, null, 13, 16],
        },
      ],
      [
        'which has both left/right child but left sub tree only has one node',
        {
          nodeToDelete: 15,
          resultTree: [10, 7, 12, 3, 8, null, 20, null, 4, null, 9, 13, null, null, 6, null, null, null, 16, 5],
        },
      ],
      [
        'which is not existed',
        {
          nodeToDelete: 100,
          resultTree: [10, 7, 12, 3, 8, null, 20, null, 4, null, 9, 15, null, null, 6, null, null, 13, 16, 5],
        },
      ],
    ])('should delete node %s', (_, { nodeToDelete, resultTree }) => {
      const tree = BinarySearchTree.fromArrayBFS([
        10,
        7,
        12,
        3,
        8,
        null,
        20,
        null,
        4,
        null,
        9,
        15,
        null,
        null,
        6,
        null,
        null,
        13,
        16,
        5,
      ]);
      const binarySearchTree = BinarySearchTree.fromBinaryTree(tree);
      binarySearchTree.delete(nodeToDelete);
      expect(binarySearchTree.toArrayBFS()).toEqual(resultTree);
    });
  });
});
