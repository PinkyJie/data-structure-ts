import { BinaryTree } from './binary-tree';

describe('Binary tree:', () => {
  it.each<number[]>([
    [0, 1, null, 3, 4, null, 5, null, 2],
    // right sub tree is empty
    [0, 1, 2, 4, null, null, 5, null, null, 3],
    // left sub tree is empty
    [0, null, 1, 2, null, null, 3, 4, null, null, 5],
    // left skewed tree
    [0, 1, 2, 3, 4],
    // right skewed tree
    [0, null, 1, null, 2, null, 3, null, 4],
  ])('should construct the tree with DFS for case %#', (...array) => {
    // keep copy for original array because `buildTree` will mutate array
    const originalArray = Array.from(array);
    const tree = BinaryTree.fromArrayDFS(array);
    expect(tree.toArrayDFS()).toEqual(originalArray);
  });

  it.each<number[]>([
    [0, 1, 2, null, 3, null, null, 4, null, null, 5],
    // right sub tree is empty
    [0, 1, null, 2, 3, 4, 5],
    // left sub tree is empty
    [0, null, 1, 2, 3, null, null, 4, 5],
    // left skewed tree
    [0, 1, null, 2, null, 3, null, 4],
    // right skewed tree
    [0, null, 1, null, 2, null, 3, null, 4],
  ])('should construct the tree with BFS for case %#', (...array) => {
    const tree = BinaryTree.fromArrayBFS(array);
    expect(tree.toArrayBFS()).toEqual(array);
  });

  describe('reverse():', () => {
    it.each<{ treeArray: number[]; reversedTreeArray: number[] }>([
      {
        treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5],
        reversedTreeArray: [0, 2, 1, null, null, 3, null, null, 4, 5],
      },
      // single root tree
      {
        treeArray: [0],
        reversedTreeArray: [0],
      },
      // right sub tree is empty
      {
        treeArray: [0, 1, null, 2, 3, 4, 5],
        reversedTreeArray: [0, null, 1, 3, 2, null, null, 5, 4],
      },
      // left sub tree is empty
      {
        treeArray: [0, null, 1, 2, 3, null, null, 4, 5],
        reversedTreeArray: [0, 1, null, 3, 2, 5, 4],
      },
      // left skewed tree
      {
        treeArray: [0, 1, null, 2, null, 3, null, 4],
        reversedTreeArray: [0, null, 1, null, 2, null, 3, null, 4],
      },
      // right skewed tree
      {
        treeArray: [0, null, 1, null, 2, null, 3, null, 4],
        reversedTreeArray: [0, 1, null, 2, null, 3, null, 4],
      },
    ])('should reverse tree correctly for case %#', ({ treeArray, reversedTreeArray }) => {
      const tree = BinaryTree.fromArrayBFS(treeArray);
      tree.reverse();
      expect(tree.toArrayBFS()).toEqual(reversedTreeArray);
    });
  });

  describe('height():', () => {
    it.each<{ treeArray: number[]; height: number }>([
      { treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5], height: 4 },
      // single root tree
      {
        treeArray: [0, null, null],
        height: 0,
      },
      // right sub tree is empty
      { treeArray: [0, 1, null, 2, 3, 4, 5], height: 3 },
      // left sub tree is empty
      { treeArray: [0, null, 1, 2, 3, null, null, 4, 5], height: 3 },
      // left skewed tree
      { treeArray: [0, 1, null, 2, null, 3, null, 4], height: 4 },
      // right skewed tree
      { treeArray: [0, null, 1, null, 2, null, 3, null, 4], height: 4 },
    ])('should get the height of the tree for case %#', ({ treeArray, height }) => {
      const tree = BinaryTree.fromArrayBFS(treeArray);
      expect(tree.height()).toBe(height);
    });
  });
});
