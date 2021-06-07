export class SinglyLinkedListNode<TDataType> {
  data: TDataType;
  nextNode: SinglyLinkedListNode<TDataType>;

  constructor(data: TDataType) {
    this.data = data;
    this.nextNode = null;
  }
}

/**
 * Singly Linked list is used when insertion/deletion is the frequent in the
 * collection.
 */
export class SinglyLinkedList<TDataType> {
  /** maintain a dummy head to prevent boilerplate null check */
  dummyHead: SinglyLinkedListNode<TDataType>;

  constructor() {
    this.dummyHead = new SinglyLinkedListNode<TDataType>(null);
  }

  /** inserts an element at the start/head of the linked list: O(1) */
  insertAtHead(data: TDataType): void {
    const oldHead = this.dummyHead.nextNode;
    const newHead = new SinglyLinkedListNode(data);
    this.dummyHead.nextNode = newHead;
    newHead.nextNode = oldHead;
  }

  /** inserts an element at the end of the linked list: O(n) */
  insertAtTail(data: TDataType): void {
    let node = this.dummyHead;
    // find tail: check if `node.nextNode` is not null
    while (node.nextNode) {
      node = node.nextNode;
    }
    node.nextNode = new SinglyLinkedListNode(data);
  }

  /** deletes the first element of the linked list: O(1) */
  deleteAtHead(): SinglyLinkedListNode<TDataType> {
    if (this.isEmpty()) {
      throw new Error('Can not delete head for empty linked list.');
    }
    const oldHead = this.dummyHead.nextNode;
    this.dummyHead.nextNode = oldHead.nextNode;
    return oldHead;
  }

  /** deletes the last element of the linked list: O(n) */
  deleteAtTail(): SinglyLinkedListNode<TDataType> {
    if (this.isEmpty()) {
      throw new Error('Can not delete tail for empty linked list.');
    }
    let node = this.dummyHead;
    // find tail: check if `node.nextNode` is not null
    while (node.nextNode) {
      if (!node.nextNode.nextNode) {
        const deletedNode = node.nextNode;
        node.nextNode = null;
        return deletedNode;
      }
      node = node.nextNode;
    }
    return null;
  }

  /** deletes an element with your specified value from the linked list: O(n) */
  delete(data: TDataType): SinglyLinkedListNode<TDataType> {
    let node = this.dummyHead;
    while (node.nextNode) {
      if (node.nextNode.data === data) {
        const deletedNode = node.nextNode;
        node.nextNode = deletedNode.nextNode;
        return deletedNode;
      }
      node = node.nextNode;
    }
    return null;
  }

  /** searches for an element in the linked list: O(n) */
  search(data: TDataType): SinglyLinkedListNode<TDataType> {
    let node = this.dummyHead.nextNode;
    while (node) {
      if (node.data === data) {
        return node;
      }
      node = node.nextNode;
    }
    return null;
  }

  /** check if the linked list is empty: O(1) */
  isEmpty(): boolean {
    return this.dummyHead.nextNode === null;
  }

  /** size of the linked list: O(n) */
  size(): number {
    let size = 0;
    let node = this.dummyHead.nextNode;
    while (node) {
      size++;
      node = node.nextNode;
    }
    return size;
  }

  /** return an array: O(n) */
  toArray(): TDataType[] {
    const array = [];
    let node = this.dummyHead.nextNode;
    while (node) {
      array.push(node.data);
      node = node.nextNode;
    }
    return array;
  }

  // ### popular operations on linked list ###

  /** reverse the linked list in place: O(n) */
  reverse(): void {
    let current = this.dummyHead.nextNode;
    // `prev` can't be `this.dummyHead`, otherwise `this.dummyHead` will be the last node
    let prev = null;
    while (current) {
      // keep reference for next node
      const next = current.nextNode;
      // assign previous node to current's next node
      current.nextNode = prev;
      // update reference for previous node
      prev = current;
      // move current to next
      current = next;
    }
    this.dummyHead.nextNode = prev;
  }

  /**
   * check if there is a loop inside linked list
   *
   * Floyd circle detection
   */
  detectLoop(): boolean {
    let oneStep = this.dummyHead.nextNode;
    let twoStep = this.dummyHead.nextNode;
    while (twoStep && twoStep.nextNode) {
      oneStep = oneStep.nextNode;
      twoStep = twoStep.nextNode.nextNode;
      if (oneStep === twoStep) {
        return true;
      }
    }
    return false;
  }

  /**
   * Find the middle node of the linked list, if there are two middle nodes,
   * return the second middle node.
   */
  findMiddleNode(): SinglyLinkedListNode<TDataType> {
    if (this.isEmpty()) {
      return null;
    }
    let oneStep = this.dummyHead.nextNode;
    let twoStep = this.dummyHead.nextNode;
    while (twoStep && twoStep.nextNode) {
      oneStep = oneStep.nextNode;
      twoStep = twoStep.nextNode.nextNode;
    }
    return oneStep;
  }
}
