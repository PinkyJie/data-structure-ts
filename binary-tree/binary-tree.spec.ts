import { BinaryTree } from './binary-tree';

describe('Binary tree', () => {
  it.each<number[]>([
    [0, 1, null, 3, 4, null, 5, null, 2, null, null, null, null],
    // right sub tree is empty
    [0, 1, 2, 4, null, null, 5, null, null, 3, null, null, null],
    // left sub tree is empty
    [0, null, 1, 2, null, null, 3, 4, null, null, 5, null, null],
    // left skewed tree
    [0, 1, 2, 3, 4, null, null, null, null, null, null],
    // right skewed tree
    [0, null, 1, null, 2, null, 3, null, 4, null, null],
  ])('should construct the tree with DFS for case %#', (...array) => {
    // keep copy for original array because `buildTree` will mutate array
    const originalArray = Array.from(array);
    const tree = BinaryTree.buildTreeDFS(array);
    expect(tree.toArrayDFS()).toEqual(originalArray);
  });

  it.each<number[]>([
    [0, 1, 2, null, 3, null, null, 4, null, null, 5, null, null],
    // right sub tree is empty
    [0, 1, null, 2, 3, 4, 5, null, null, null, null, null, null],
    // left sub tree is empty
    [0, null, 1, 2, 3, null, null, 4, 5, null, null, null, null],
    // left skewed tree
    [0, 1, null, 2, null, 3, null, 4, null, null, null],
    // right skewed tree
    [0, null, 1, null, 2, null, 3, null, 4, null, null],
  ])('should construct the tree with BFS for case %#', (...array) => {
    const tree = BinaryTree.buildTreeBFS(array);
    expect(tree.toArrayBFS()).toEqual(array);
  });

  it.each<{ treeArray: number[]; reversedTreeArray: number[] }>([
    {
      treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5, null, null],
      reversedTreeArray: [0, 2, 1, null, null, 3, null, null, 4, 5, null, null, null],
    },
    // single root tree
    {
      treeArray: [0, null, null],
      reversedTreeArray: [0, null, null],
    },
    // right sub tree is empty
    {
      treeArray: [0, 1, null, 2, 3, 4, 5, null, null, null, null, null, null],
      reversedTreeArray: [0, null, 1, 3, 2, null, null, 5, 4, null, null, null, null],
    },
    // left sub tree is empty
    {
      treeArray: [0, null, 1, 2, 3, null, null, 4, 5, null, null, null, null],
      reversedTreeArray: [0, 1, null, 3, 2, 5, 4, null, null, null, null, null, null],
    },
    // left skewed tree
    {
      treeArray: [0, 1, null, 2, null, 3, null, 4, null, null, null],
      reversedTreeArray: [0, null, 1, null, 2, null, 3, null, 4, null, null],
    },
    // right skewed tree
    {
      treeArray: [0, null, 1, null, 2, null, 3, null, 4, null, null],
      reversedTreeArray: [0, 1, null, 2, null, 3, null, 4, null, null, null],
    },
  ])('should reverse tree correctly for case %#', ({ treeArray, reversedTreeArray }) => {
    const tree = BinaryTree.buildTreeBFS(treeArray);
    tree.reverse();
    expect(tree.toArrayBFS()).toEqual(reversedTreeArray);
  });

  it.each<{ treeArray: number[]; height: number }>([
    { treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5, null, null], height: 5 },
    // single root tree
    {
      treeArray: [0],
      height: 1,
    },
    // right sub tree is empty
    { treeArray: [0, 1, null, 2, 3, 4, 5, null, null, null, null, null, null], height: 4 },
    // left sub tree is empty
    { treeArray: [0, null, 1, 2, 3, null, null, 4, 5, null, null, null, null], height: 4 },
    // left skewed tree
    { treeArray: [0, 1, null, 2, null, 3, null, 4, null, null, null], height: 5 },
    // right skewed tree
    { treeArray: [0, null, 1, null, 2, null, 3, null, 4, null, null], height: 5 },
  ])('should get the height of the tree for case %#', ({ treeArray, height }) => {
    const tree = BinaryTree.buildTreeBFS(treeArray);
    expect(tree.height()).toBe(height);
  });
});
