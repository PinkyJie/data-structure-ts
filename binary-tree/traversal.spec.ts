import { BinaryTree } from './binary-tree';
import { dfsInOrder, dfsPreOrder, dfsPostOrder, bfs } from './traversal';

describe('Binary tree traversal', () => {
  it.each<{
    treeArray: number[];
    dfsInOrderResult: number[];
    dfsPreOrderResult: number[];
    dfsPostOrderResult: number[];
    bfsResult: number[];
  }>([
    {
      treeArray: [0, 1, 2, null, 3, null, null, 4, null, null, 5],
      dfsInOrderResult: [1, 4, 5, 3, 0, 2],
      dfsPreOrderResult: [0, 1, 3, 4, 5, 2],
      dfsPostOrderResult: [5, 4, 3, 1, 2, 0],
      bfsResult: [0, 1, 2, 3, 4, 5],
    },
    // right sub tree is empty
    {
      treeArray: [0, 1, null, 2, 3, 4, 5],
      dfsInOrderResult: [4, 2, 5, 1, 3, 0],
      dfsPreOrderResult: [0, 1, 2, 4, 5, 3],
      dfsPostOrderResult: [4, 5, 2, 3, 1, 0],
      bfsResult: [0, 1, 2, 3, 4, 5],
    },
    // left sub tree is empty
    {
      treeArray: [0, null, 1, 2, 3, null, null, 4, 5],
      dfsInOrderResult: [0, 2, 1, 4, 3, 5],
      dfsPreOrderResult: [0, 1, 2, 3, 4, 5],
      dfsPostOrderResult: [2, 4, 5, 3, 1, 0],
      bfsResult: [0, 1, 2, 3, 4, 5],
    },
    // left skewed tree
    {
      treeArray: [0, 1, null, 2, null, 3, null, 4],
      dfsInOrderResult: [4, 3, 2, 1, 0],
      dfsPreOrderResult: [0, 1, 2, 3, 4],
      dfsPostOrderResult: [4, 3, 2, 1, 0],
      bfsResult: [0, 1, 2, 3, 4],
    },
    // right skewed tree
    {
      treeArray: [0, null, 1, null, 2, null, 3, null, 4],
      dfsInOrderResult: [0, 1, 2, 3, 4],
      dfsPreOrderResult: [0, 1, 2, 3, 4],
      dfsPostOrderResult: [4, 3, 2, 1, 0],
      bfsResult: [0, 1, 2, 3, 4],
    },
  ])(
    'should traverse the tree for case %#',
    ({ treeArray, dfsInOrderResult, dfsPreOrderResult, dfsPostOrderResult, bfsResult }) => {
      const tree = BinaryTree.fromArrayBFS(treeArray);

      // DFS in order
      const inOrderArr: number[] = [];
      const inOrderVisit = (data: number): void => {
        inOrderArr.push(data);
      };
      dfsInOrder(tree, inOrderVisit);
      expect(inOrderArr).toEqual(dfsInOrderResult);

      // DFS pre order
      const preOrderArr: number[] = [];
      const preOrderVisit = (data: number): void => {
        preOrderArr.push(data);
      };
      dfsPreOrder(tree, preOrderVisit);
      expect(preOrderArr).toEqual(dfsPreOrderResult);

      // DFS post order
      const postOrderArr: number[] = [];
      const postOrderVisit = (data: number): void => {
        postOrderArr.push(data);
      };
      dfsPostOrder(tree, postOrderVisit);
      expect(postOrderArr).toEqual(dfsPostOrderResult);

      // BFS
      const bfsArr: number[] = [];
      const bfsVisit = (data: number): void => {
        bfsArr.push(data);
      };
      bfs(tree, bfsVisit);
      expect(bfsArr).toEqual(bfsResult);
    },
  );
});
