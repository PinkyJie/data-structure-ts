import { BinaryTree } from './binary-tree';
import { inOrder, preOrder, postOrder } from './traversal';

describe('Binary tree traversal', () => {
  it.each<{ treeArray: number[]; inOrderResult: number[]; preOrderResult: number[]; postOrderResult: number[] }>([
    {
      treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5, null, null],
      inOrderResult: [1, 4, 5, 3, 0, 2],
      preOrderResult: [0, 1, 3, 4, 5, 2],
      postOrderResult: [5, 4, 3, 1, 2, 0],
    },
    // right sub tree is empty
    {
      treeArray: [0, 1, null, 2, 3, 4, 5, null, null, null, null, null, null],
      inOrderResult: [4, 2, 5, 1, 3, 0],
      preOrderResult: [0, 1, 2, 4, 5, 3],
      postOrderResult: [4, 5, 2, 3, 1, 0],
    },
    // left sub tree is empty
    {
      treeArray: [0, null, 1, 2, 3, null, null, 4, 5, null, null, null, null],
      inOrderResult: [0, 2, 1, 4, 3, 5],
      preOrderResult: [0, 1, 2, 3, 4, 5],
      postOrderResult: [2, 4, 5, 3, 1, 0],
    },
    // left skewed tree
    {
      treeArray: [0, 1, null, 2, null, 3, null, 4, null, null, null],
      inOrderResult: [4, 3, 2, 1, 0],
      preOrderResult: [0, 1, 2, 3, 4],
      postOrderResult: [4, 3, 2, 1, 0],
    },
    // right skewed tree
    {
      treeArray: [0, null, 1, null, 2, null, 3, null, 4, null, null],
      inOrderResult: [0, 1, 2, 3, 4],
      preOrderResult: [0, 1, 2, 3, 4],
      postOrderResult: [4, 3, 2, 1, 0],
    },
  ])('should traverse the tree for case %#', ({ treeArray, inOrderResult, preOrderResult, postOrderResult }) => {
    const tree = BinaryTree.buildTreeBFS(treeArray);

    // in order
    const inOrderArr: number[] = [];
    const inOrderVisit = (data: number): void => {
      inOrderArr.push(data);
    };
    inOrder(tree, inOrderVisit);
    expect(inOrderArr).toEqual(inOrderResult);

    // pre order
    const preOrderArr: number[] = [];
    const preOrderVisit = (data: number): void => {
      preOrderArr.push(data);
    };
    preOrder(tree, preOrderVisit);
    expect(preOrderArr).toEqual(preOrderResult);

    // post order
    const postOrderArr: number[] = [];
    const postOrderVisit = (data: number): void => {
      postOrderArr.push(data);
    };
    postOrder(tree, postOrderVisit);
    expect(postOrderArr).toEqual(postOrderResult);
  });
});
