import { BinaryTreeNode, BinaryTree } from './binary-tree';

/** Traverse the tree by: Left Root Right O(n) */
export function inOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
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

/** Traverse the tree by: Root Left Right O(n) */
export function preOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
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

/** Traverse the tree by: Left Right Root O(n) */
export function postOrder<TDataType>(tree: BinaryTree<TDataType>, doVisit: (data: TDataType) => void): void {
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
