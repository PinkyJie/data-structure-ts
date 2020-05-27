import { BinaryTree } from './binary-tree';
import { AVLTree } from './avl-tree';

describe('AVL tree:', () => {
  const treeSample = [13, 10, 15, 5, 11, null, 18, 4, 8, null, null, null, null, null, null, null, null];

  describe('insert()', () => {
    it.each<[string, { nodeToInsert: number; resultTree: number[] }]>([
      [
        'with no rotation required',
        {
          nodeToInsert: 14,
          resultTree: [13, 10, 15, 5, 11, 14, 18, 4, 8, null, null, null, null, null, null, null, null, null, null],
        },
      ],
      [
        'with case left left',
        {
          nodeToInsert: 3,
          resultTree: [13, 5, 15, 4, 10, null, 18, 3, null, 8, 11, null, null, null, null, null, null, null, null],
        },
      ],
      [
        'with case left right',
        {
          nodeToInsert: 9,
          resultTree: [13, 8, 15, 5, 10, null, 18, 4, null, 9, 11, null, null, null, null, null, null, null, null],
        },
      ],
      [
        'with case right right',
        {
          nodeToInsert: 20,
          resultTree: [13, 10, 18, 5, 11, 15, 20, 4, 8, null, null, null, null, null, null, null, null, null, null],
        },
      ],
      [
        'with case right left',
        {
          nodeToInsert: 17,
          resultTree: [13, 10, 17, 5, 11, 15, 18, 4, 8, null, null, null, null, null, null, null, null, null, null],
        },
      ],
    ])('should insert node %s', (_, { nodeToInsert, resultTree }) => {
      const tree = BinaryTree.fromArrayBFS(treeSample);
      const avlTree = AVLTree.fromBinaryTree(tree);
      // make sure each node has height before insertion
      avlTree.updateNodeHeight();
      avlTree.insert(nodeToInsert);
      expect(avlTree.toArrayBFS()).toEqual(resultTree);
    });
  });
});
