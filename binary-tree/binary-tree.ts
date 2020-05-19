class BinaryTreeNode<TDataType> {
  data: TDataType;
  leftChild: BinaryTreeNode<TDataType>;
  rightChild: BinaryTreeNode<TDataType>;

  constructor(data: TDataType) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

export class BinaryTree<TDataType> {
  root: BinaryTreeNode<TDataType> = null;

  constructor(rootData: TDataType) {
    this.root = new BinaryTreeNode(rootData);
  }

  /**
   * [0, 1, 2, 4, null, null, null, 3, 5, null, null, null, null] means:
   *  - 0 is the root node, its left is 1, right is null
   *  - 1's left is 2, right is 3
   *  - 2's left is 4, right is null
   *  - 3's left is 5, right is null
   *  - 4 and 5's left and right are both null
   */
  static buildTreeDFS<TDataType>(array: TDataType[]): BinaryTree<TDataType> {
    const tree = new BinaryTree(array[0]);
    tree.root = _buildTree(array);
    return tree;
  }

  toArrayDFS(): TDataType[] {
    const array: TDataType[] = [];
    _toArray<TDataType>(this.root, array);
    return array;
  }

  /**
   * [0, 1, null, 2, 3, 4, null, 5, null, null, null, null, null] means:
   *  - 0 is the root node, its left is 1, right is null
   *  - 1's left is 2, right is 3
   *  - 2's left is 4, right is null
   *  - 3's left is 5, right is null
   *  - 4 and 5's left and right are both null
   */
  static buildTreeBFS<TDataType>(array: TDataType[]): BinaryTree<TDataType> {
    const tree = new BinaryTree(array[0]);
    const parentQueue = [tree.root];
    let i = 1;
    while (i < array.length) {
      const parent = parentQueue.shift();
      if (array[i] !== null) {
        parent.leftChild = new BinaryTreeNode(array[i]);
        parentQueue.push(parent.leftChild);
      }
      i++;
      if (i < array.length && array[i] !== null) {
        parent.rightChild = new BinaryTreeNode(array[i]);
        parentQueue.push(parent.rightChild);
      }
      i++;
    }
    return tree;
  }

  toArrayBFS(): TDataType[] {
    const array: TDataType[] = [this.root.data];
    const parentQueue = [this.root];
    while (parentQueue.length > 0) {
      const parent = parentQueue.shift();
      if (parent.leftChild) {
        array.push(parent.leftChild.data);
        parentQueue.push(parent.leftChild);
      } else {
        array.push(null);
      }
      if (parent.rightChild) {
        array.push(parent.rightChild.data);
        parentQueue.push(parent.rightChild);
      } else {
        array.push(null);
      }
    }
    return array;
  }
}

function _buildTree<TDataType>(array: TDataType[]): BinaryTreeNode<TDataType> {
  const data = array.shift();
  if (data === null) {
    return null;
  }
  const parent = new BinaryTreeNode(data);
  if (array.length > 0) {
    parent.leftChild = _buildTree(array);
  }
  if (array.length > 0) {
    parent.rightChild = _buildTree(array);
  }
  return parent;
}

function _toArray<TDataType>(node: BinaryTreeNode<TDataType>, array: TDataType[]): void {
  if (!node) {
    array.push(null);
  } else {
    array.push(node.data);
    _toArray(node.leftChild, array);
    _toArray(node.rightChild, array);
  }
}
