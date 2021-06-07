import { BinarySearchTree } from './binary-search-tree';
import { BinaryTree, BinaryTreeNode } from './binary-tree';

export type AVLTreeNode = BinaryTreeNode<number>;

/**
 * AVL Tree: self-balanced BST
 *  - for each node, the height difference between its left sub tree and right sub tree can
 * not be more than one.
 *  - need to maintain the above property after each insert/delete (re-balance)
 *
 * Why AVL tree?
 *  - for normal BST, time complexity of search/insert/delete depends on tree's height O(h),
 * h can be log(n)~n, with AVL, since the tree is balanced, the time complexity is guaranteed
 * to be O(log(n)).
 */
export class AVLTree extends BinarySearchTree {
  static fromBinaryTree(tree: BinaryTree<number>): AVLTree {
    const avlTree = new AVLTree();
    avlTree.root = tree.root;
    return avlTree;
  }

  updateNodeHeight(): void {
    this.root.height = _updateNodeHeight(this.root, 0);
  }

  /** O(log(n)) */
  insert(data: number): void {
    this.root = _insert(this.root, data);
  }

  /** O(log(n)) */
  delete(data: number): AVLTreeNode {
    return _delete(this.root, data);
  }
}

/**
 * Re-balance strategy: left/right rotation on sub tree rooted by y(LEFT) or x(RIGHT)
 *
 *      y                             x
 *     / \     Right Rotation        / \
 *    x  T3    - - - - - - - >      T1  y
 *   / \       < - - - - - - -         / \
 *  T1 T2      Left Rotation          T2 T3
 *
 * it could maintain `data(T1) < data(x) < data(T2) < data(y) < data(T3)` for
 * both before and after rotation
 */

/** Do left rotation on the sub tree rooted by `x`, return the new root y */
function _leftRotate(x: AVLTreeNode): AVLTreeNode {
  const y = x.rightChild;
  const T2 = y.leftChild;
  // rotate
  x.rightChild = T2;
  y.leftChild = x;

  // update height: update child x first
  x.height = _getUpdatedHeight(x);
  y.height = _getUpdatedHeight(y);

  return y;
}

/** Do right rotation on the sub tree rooted by `y`, return the new root x */
function _rightRotate(y: AVLTreeNode): AVLTreeNode {
  const x = y.leftChild;
  const T2 = x.rightChild;
  // rotate
  y.leftChild = T2;
  x.rightChild = y;

  // update height: update child y first
  y.height = _getUpdatedHeight(y);
  x.height = _getUpdatedHeight(x);

  return x;
}

/**
 * 1. perform normal BST insertion
 * 2. do re-balance with the node
 */
function _insert(node: AVLTreeNode, data: number): AVLTreeNode {
  // normal BST insertion
  if (!node) {
    const newNode = new BinaryTreeNode(data);
    // for newly inserted node, set height to 1 cause it's the leaf node
    newNode.height = 1;
    return newNode;
  }
  if (data < node.data) {
    node.leftChild = _insert(node.leftChild, data);
  } else {
    node.rightChild = _insert(node.rightChild, data);
  }

  /**
   * Insertion of `nodeToInsert` is done already, we are traversing upwards,
   * here we will pass the insertion path recursively from `nodeToInsert`
   * back to `root`, the same route as insertion happens, but reversely.
   *
   */
  return _reBalance(node);
}

/**
 * 1. perform normal BST deletion
 * 2. do re-balance with the node
 */
function _delete(node: AVLTreeNode, data: number): AVLTreeNode {
  // normal BST deletion
  if (!node) {
    return null;
  }
  if (data < node.data) {
    node.leftChild = _delete(node.leftChild, data);
  } else if (data > node.data) {
    node.rightChild = _delete(node.rightChild, data);
  } else {
    if (!node.leftChild) {
      return node.rightChild;
    }
    if (!node.rightChild) {
      return node.leftChild;
    }

    const largestNodeInLeftSubTree = _findRightMostNode(node.leftChild);
    node.leftChild = _delete(node.leftChild, largestNodeInLeftSubTree.data);
    node.data = largestNodeInLeftSubTree.data;
  }

  return _reBalance(node);
}

function _findRightMostNode(node: AVLTreeNode): AVLTreeNode {
  while (node.rightChild) {
    node = node.rightChild;
  }
  return node;
}

/**
 * What we need to do here is to check the height difference for each
 * "visited node" (visited during insertion/deletion) to see if it violates the rule
 * |H(left) - H(right)| > 1.
 *
 * If node `v` violates, we need to do rotation to fix it:
 *  - check its child node `c` and grand child node `p` on the travelled path
 *  - there will be 4 different cases:
 *    - 1. Left Left   -> `v`'s left height is larger than right, `c`'s left is larger than right
 *    - 2. Left Right  -> `v`'s left height is larger than right, `c`'s right is larger than left
 *    - 3. Right Right -> `v`'s right height is larger than left, `c`'s right is larger than left
 *    - 4. Right Left  -> `v`'s right height is larger than left, `c`'s left is larger than right
 *  - handle these 4 cases with different strategy:
 *      1.   v      right rotation on v         c
 *          / \                               /   \
 *         c   T4                            p     v
 *        / \                               / \   / \
 *       p   T3                            T1 T2 T3 T4
 *      / \
 *     T1 T2
 *
 *      2.   v      left rotation on c     v    same as 1, do right rotation on c
 *          / \                           / \
 *         c  T4                         p  T4
 *        / \                           / \
 *       T1  p                         c  T3
 *          / \                       / \
 *         T2 T3                     T1 T2
 *
 *      3.   v      left rotation on v       c
 *          / \                            /   \
 *         T1  c                          v     p
 *            / \                        / \   / \
 *           T2  p                      T1 T2 T3 T4
 *              / \
 *             T3 T4
 *
 *      4.   v      right rotation on c    v    same as 3, do left rotation on v
 *          / \                           / \
 *         T1  c                         T1  p
 *            / \                           / \
 *           p  T4                         T2  c
 *          / \                               / \
 *         T2 T3                             T3 T4
 */
function _reBalance(node: AVLTreeNode): AVLTreeNode {
  const heightDifference = _getHeightDifference(node);
  if (heightDifference > 1) {
    // v's left height is larger than right height
    if (_getHeightDifference(node.leftChild) > 0) {
      // Left Left
      return _rightRotate(node);
    }
    // Left Right
    node.leftChild = _leftRotate(node.leftChild);
    return _rightRotate(node);
  }
  if (heightDifference < -1) {
    // v's right height is larger than left height
    if (_getHeightDifference(node.rightChild) < 0) {
      // Right Right
      return _leftRotate(node);
    }
    // Right Left
    node.rightChild = _rightRotate(node.rightChild);
    return _leftRotate(node);
  }
  node.height = _getUpdatedHeight(node);
  return node;
}

function _getHeight(node: AVLTreeNode): number {
  // for null node, return 0
  return node ? node.height : 0;
}

function _getUpdatedHeight(node: AVLTreeNode): number {
  return 1 + Math.max(_getHeight(node.leftChild), _getHeight(node.rightChild));
}

function _getHeightDifference(node: AVLTreeNode): number {
  return _getHeight(node.leftChild) - _getHeight(node.rightChild);
}

/**
 * This height is different from the height() in `BinaryTree`, in order to help us
 * calculate the height difference, we should treat leaf's height as 1.
 *
 * Why? Think about this case:
 *       x (h:2)                   x (h:3)
 *      /                         /
 *     y (h:1)        V.S.       y (h:2)
 *    /                         /
 *   z (h:0)                   z (h:1)
 * For node x, obviously it's unbalanced, but if we follow the original height() [Left]
 * calculation, its left sub tree height (y's height -> 1) minus its right sub tree height 0
 * will be 1, which does not violate the rule. If we choose the new height (Right), its
 * left sub tree height is 2, right sub tree height is 0, which violates the rule. Basically
 * we set leaf node's height to 1 so we can distinguish leaf node with null node.
 */
function _updateNodeHeight(node: AVLTreeNode, curHeight: number): number {
  const leftTreeHeight = node.leftChild ? _updateNodeHeight(node.leftChild, curHeight) : 0;
  const rightTreeHeight = node.rightChild ? _updateNodeHeight(node.rightChild, curHeight) : 0;
  node.height = 1 + Math.max(leftTreeHeight, rightTreeHeight);
  return node.height;
}
