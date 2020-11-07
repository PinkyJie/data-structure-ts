import { BinaryTree } from './binary-tree';
import { AVLTree } from './avl-tree';

describe('AVL tree:', () => {
  describe('insert()', () => {
    it.each<[string, { nodeToInsert: number; resultTree: number[] }]>([
      [
        'with no rotation required',
        {
          nodeToInsert: 14,
          resultTree: [13, 10, 15, 5, 11, 14, 18, 4, 8],
        },
      ],
      [
        'with case left left',
        {
          nodeToInsert: 3,
          resultTree: [13, 5, 15, 4, 10, null, 18, 3, null, 8, 11],
        },
      ],
      [
        'with case left right',
        {
          nodeToInsert: 9,
          resultTree: [13, 8, 15, 5, 10, null, 18, 4, null, 9, 11],
        },
      ],
      [
        'with case right right',
        {
          nodeToInsert: 20,
          resultTree: [13, 10, 18, 5, 11, 15, 20, 4, 8],
        },
      ],
      [
        'with case right left',
        {
          nodeToInsert: 17,
          resultTree: [13, 10, 17, 5, 11, 15, 18, 4, 8],
        },
      ],
    ])('should insert node %s', (_, { nodeToInsert, resultTree }) => {
      const tree = BinaryTree.fromArrayBFS([13, 10, 15, 5, 11, null, 18, 4, 8]);
      const avlTree = AVLTree.fromBinaryTree(tree);
      // make sure each node has height before insertion
      avlTree.updateNodeHeight();
      avlTree.insert(nodeToInsert);
      expect(avlTree.toArrayBFS()).toEqual(resultTree);
    });
  });

  describe('delete()', () => {
    it.each<[string, { nodeToInsert: number[]; resultTree: number[] }]>([
      [
        'with no rotation required',
        {
          nodeToInsert: [8],
          resultTree: [13, 10, 15, 5, 11, 14, 19, 4, null, null, null, null, null, 18, 20],
        },
      ],
      [
        'with case left left',
        {
          nodeToInsert: [8, 11],
          resultTree: [13, 5, 15, 4, 10, 14, 19, null, null, null, null, null, null, 18, 20],
        },
      ],
      [
        'with case left right',
        {
          nodeToInsert: [4, 11],
          resultTree: [13, 8, 15, 5, 10, 14, 19, null, null, null, null, null, null, 18, 20],
        },
      ],
      [
        'with case right right',
        {
          nodeToInsert: [14, 18],
          resultTree: [13, 10, 19, 5, 11, 15, 20, 4, 8],
        },
      ],
      [
        'with case right left',
        {
          nodeToInsert: [14, 20],
          resultTree: [13, 10, 18, 5, 11, 15, 19, 4, 8],
        },
      ],
    ])('should delete node %s', (_, { nodeToInsert, resultTree }) => {
      const tree = BinaryTree.fromArrayBFS([13, 10, 15, 5, 11, 14, 19, 4, 8, null, null, null, null, 18, 20]);
      const avlTree = AVLTree.fromBinaryTree(tree);
      // make sure each node has height before insertion
      avlTree.updateNodeHeight();

      nodeToInsert.forEach((node) => {
        avlTree.delete(node);
      });
      expect(avlTree.toArrayBFS()).toEqual(resultTree);
    });
  });
});
