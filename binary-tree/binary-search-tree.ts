import { BinaryTree, BinaryTreeNode } from './binary-tree';

/**
 * For any node in the BST:
 * node data for left sub tree < node data for parent < node data for right sub tree
 *    - for each node, left child data < parent data < right child data
 *    - for each node, all the left sub tree data < parent data < all the right sub tree data
 *
 * Why is BST good?
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
  search(data: number): BinaryTreeNode<number> {
    return _search(this.root, data);
  }

  /** O(h) h: log(n)~n */
  insert(data: number): void {
    this.root = _insert(this.root, data);
  }

  /** O(h) h: log(n)~n */
  delete(data: number): BinaryTreeNode<number> {
    const searchResult = _searchWithParentReturn(this.root, null, data);
    if (!searchResult) {
      return null;
    }
    const { nodeToDelete, parent } = searchResult;

    if (!nodeToDelete.leftChild && !nodeToDelete.rightChild) {
      /**
       * Case 1: `nodeToDelete` has no child
       *  - detach this `nodeToDelete` from its parent directly: O(1)
       */
      this._replaceNodeWith(nodeToDelete, parent, null);
    } else if (nodeToDelete.leftChild && !nodeToDelete.rightChild) {
      /**
       * Case 2: `nodeToDelete` only has left child
       *  - replace `nodeToDelete` with its left child: O(1)
       */
      this._replaceNodeWith(nodeToDelete, parent, nodeToDelete.leftChild);
    } else if (!nodeToDelete.leftChild && nodeToDelete.rightChild) {
      /**
       * Case 3: `nodeToDelete` only has right child
       *  - replace `nodeToDelete` with its right child: O(1)
       */
      this._replaceNodeWith(nodeToDelete, parent, nodeToDelete.rightChild);
    } else {
      /**
       * Case 4: `nodeToDelete` has both left child and right child
       *  - find the largest node(right most node) in the left sub tree: O(h)
       *  - replace this right most node with its left child (right most node has no right child): O(1)
       *  - replace `nodeToDelete` with this right most node: O(1)
       *  - attach `nodeToDelete`'s left/right child to this right most node: O(1)
       */
      const rightMostNode = _findRightMostNode(nodeToDelete.leftChild, nodeToDelete);
      this._replaceNodeWith(rightMostNode.node, rightMostNode.parent, rightMostNode.node.leftChild);
      this._replaceNodeWith(nodeToDelete, parent, rightMostNode.node);
      rightMostNode.node.leftChild = nodeToDelete.leftChild;
      rightMostNode.node.rightChild = nodeToDelete.rightChild;
    }

    return nodeToDelete;
  }

  _replaceNodeWith(
    node: BinaryTreeNode<number>,
    parent: BinaryTreeNode<number>,
    newNode: BinaryTreeNode<number>,
  ): void {
    if (node === this.root) {
      this.root = newNode;
    } else if (parent.leftChild === node) {
      parent.leftChild = newNode;
    } else {
      parent.rightChild = newNode;
    }
  }
}

function _search(node: BinaryTreeNode<number>, data: number): BinaryTreeNode<number> {
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

function _insert(node: BinaryTreeNode<number>, data: number): BinaryTreeNode<number> {
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

function _searchWithParentReturn(
  node: BinaryTreeNode<number>,
  parent: BinaryTreeNode<number>,
  data: number,
): {
  nodeToDelete: BinaryTreeNode<number>;
  parent: BinaryTreeNode<number>;
} {
  if (!node) {
    return null;
  }
  if (node.data === data) {
    return {
      nodeToDelete: node,
      parent,
    };
  }
  if (data < node.data) {
    return _searchWithParentReturn(node.leftChild, node, data);
  }
  return _searchWithParentReturn(node.rightChild, node, data);
}

function _findRightMostNode(
  node: BinaryTreeNode<number>,
  parent: BinaryTreeNode<number>,
): {
  node: BinaryTreeNode<number>;
  parent: BinaryTreeNode<number>;
} {
  while (node.rightChild) {
    parent = node;
    node = node.rightChild;
  }
  return {
    node,
    parent,
  };
}
