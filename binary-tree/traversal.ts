import { BinaryTreeNode, BinaryTree } from './binary-tree';

/** Traverse the tree by: for each node Left -> Root -> Right O(n) */
export function dfsInOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
  _inOrder(tree.root, doVisit);
}

function _inOrder<TDataType>(node: BinaryTreeNode<TDataType>, doVisit: (data: TDataType) => void): void {
  if (!node) {
    return;
  }
  _inOrder(node.leftChild, doVisit);
  doVisit(node.data);
  _inOrder(node.rightChild, doVisit);
}

/** Traverse the tree by: for each node Root -> Left -> Right O(n) */
export function dfsPreOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
  _preOrder(tree.root, doVisit);
}

function _preOrder<TDataType>(node: BinaryTreeNode<TDataType>, doVisit: (data: TDataType) => void): void {
  if (!node) {
    return;
  }
  doVisit(node.data);
  _preOrder(node.leftChild, doVisit);
  _preOrder(node.rightChild, doVisit);
}

/** Traverse the tree by: for each node Left -> Right -> Root O(n) */
export function dfsPostOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
  _postOrder(tree.root, doVisit);
}

function _postOrder<TDataType>(node: BinaryTreeNode<TDataType>, doVisit: (data: TDataType) => void): void {
  if (!node) {
    return;
  }
  _postOrder(node.leftChild, doVisit);
  _postOrder(node.rightChild, doVisit);
  doVisit(node.data);
}

/** Traverse the tree level by level */
export function bfs<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
  if (!tree.root) {
    return;
  }
  const queue = [tree.root];
  while (queue.length > 0) {
    const levelLen = queue.length;
    for (let i = 0; i < levelLen; i++) {
      const node = queue.shift();
      doVisit(node.data);
      if (node.leftChild) {
        queue.push(node.leftChild);
      }
      if (node.rightChild) {
        queue.push(node.rightChild);
      }
    }
  }
}
