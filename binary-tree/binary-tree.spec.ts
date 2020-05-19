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
});
