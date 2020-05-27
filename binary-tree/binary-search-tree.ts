import { BinaryTree, BinaryTreeNode } from './binary-tree';

export type BinarySearchTreeNode = BinaryTreeNode<number>;

/**
 * Binary Search Tree: for any node in the tree,
 * node data for left sub tree < node data for parent < node data for right sub tree
 *    - for each node, left child data < parent data < right child data
 *    - for each node, all the left sub tree data < parent data < all the right sub tree data
 *
 * Why BST?
 *    - in order traversal for BST will result in a sorted array
 *    - search/insert/delete can be done within O(h), h is the height of the BST: log(n)~n
 */
export class BinarySearchTree extends BinaryTree<number> {
  static fromBinaryTree(tree: BinaryTree<number>): BinarySearchTree {
    const binarySearchTree = new BinarySearchTree();
    binarySearchTree.root = tree.root;
    return binarySearchTree;
  }

  /** O(h) h: log(n)~n */
  search(data: number): BinarySearchTreeNode {
    return _search(this.root, data);
  }

  /** O(h) h: log(n)~n */
  insert(data: number): void {
    this.root = _insert(this.root, data);
  }

  /** O(h) h: log(n)~n */
  delete(data: number): BinarySearchTreeNode {
    return _delete(this.root, data);
  }
}

function _search(node: BinarySearchTreeNode, data: number): BinarySearchTreeNode {
  if (!node) {
    return null;
  }
  if (node.data === data) {
    return node;
  }
  if (data < node.data) {
    return _search(node.leftChild, data);
  }
  return _search(node.rightChild, data);
}

/** will always return the updated version of the node we passed in */
function _insert(node: BinarySearchTreeNode, data: number): BinarySearchTreeNode {
  if (!node) {
    return new BinaryTreeNode(data);
  }
  if (data < node.data) {
    node.leftChild = _insert(node.leftChild, data);
  } else {
    node.rightChild = _insert(node.rightChild, data);
  }
  return node;
}

/** will always return the updated version of the node we passed in */
function _delete(node: BinarySearchTreeNode, data: number): BinarySearchTreeNode {
  if (!node) {
    return null;
  }
  if (data < node.data) {
    node.leftChild = _delete(node.leftChild, data);
    // return unchanged node
    return node;
  }
  if (data > node.data) {
    node.rightChild = _delete(node.rightChild, data);
    // return unchanged node
    return node;
  }

  // return right child if nodeToDelete only has right child so it can replace nodeToDelete
  if (!node.leftChild) {
    return node.rightChild;
  }
  // return left child if nodeToDelete only has left child so it can replace nodeToDelete
  if (!node.rightChild) {
    return node.leftChild;
  }

  /**
   * If nodeToDelete has both left/right child:
   *  - find the largest (right most) node in the left sub tree
   *  - delete this right most node from the left sub tree
   *  - copy the data of the right most node to the node
   *
   * Note: we can also find the smallest node in the right sub tree, no difference.
   */
  const largestNodeInLeftSubTree = _findRightMostNode(node.leftChild);
  node.leftChild = _delete(node.leftChild, largestNodeInLeftSubTree.data);
  node.data = largestNodeInLeftSubTree.data;
  // return the node with updated data
  return node;
}

function _findRightMostNode(node: BinarySearchTreeNode): BinarySearchTreeNode {
  while (node.rightChild) {
    node = node.rightChild;
  }
  return node;
}
