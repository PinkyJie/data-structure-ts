class DoublyLinkedListNode<TDataType> {
  data: TDataType;
  previousNode: DoublyLinkedListNode<TDataType>;
  nextNode: DoublyLinkedListNode<TDataType>;

  constructor(data: TDataType) {
    this.data = data;
    this.previousNode = null;
    this.nextNode = null;
  }
}

/**
 * Doubly Linked list is used as a double ended queue: when we need to achieve
 * O(1) for insert/delete element at both the start and the end of the queue.
 */
export class DoublyLinkedList<TDataType> {
  /** maintain a dummy head to prevent boilerplate null check */
  dummyHead: DoublyLinkedListNode<TDataType>;
  /** maintain a dummy tail to prevent boilerplate null check */
  dummyTail: DoublyLinkedListNode<TDataType>;

  constructor() {
    this.dummyHead = new DoublyLinkedListNode<TDataType>(null);
    this.dummyTail = new DoublyLinkedListNode<TDataType>(null);
    this.dummyHead.nextNode = this.dummyTail;
    this.dummyTail.previousNode = this.dummyHead;
  }

  /** inserts an element at the start/head of the linked list: O(1) */
  insertAtHead(data: TDataType): void {
    const oldHead = this.dummyHead.nextNode;
    const newHead = new DoublyLinkedListNode(data);
    newHead.previousNode = this.dummyHead;
    this.dummyHead.nextNode = newHead;
    newHead.nextNode = oldHead;
    oldHead.previousNode = newHead;
  }

  /** inserts an element at the end of the linked list: O(1) */
  insertAtTail(data: TDataType): void {
    const oldTail = this.dummyTail.previousNode;
    const newTail = new DoublyLinkedListNode(data);
    newTail.previousNode = oldTail;
    oldTail.nextNode = newTail;
    newTail.nextNode = this.dummyTail;
    this.dummyTail.previousNode = newTail;
  }

  /** deletes the first element of the linked list: O(1) */
  deleteAtHead(): DoublyLinkedListNode<TDataType> {
    if (this.isEmpty()) {
      throw new Error('Can not delete head for empty linked list.');
    }
    const oldHead = this.dummyHead.nextNode;
    oldHead.nextNode.previousNode = this.dummyHead;
    this.dummyHead.nextNode = oldHead.nextNode;
    return oldHead;
  }

  /** deletes the last element of the linked list: O(1) */
  deleteAtTail(): DoublyLinkedListNode<TDataType> {
    if (this.isEmpty()) {
      throw new Error('Can not delete tail for empty linked list.');
    }
    const oldTail = this.dummyTail.previousNode;
    oldTail.previousNode.nextNode = this.dummyTail;
    this.dummyTail.previousNode = oldTail.previousNode;
    return oldTail;
  }

  /** deletes an element with your specified value from the linked list: O(n) */
  delete(data: TDataType): DoublyLinkedListNode<TDataType> {
    const node = this.search(data);
    if (node) {
      node.previousNode.nextNode = node.nextNode;
      node.nextNode.previousNode = node.previousNode;
    }
    return node;
  }

  /** searches for an element in the linked list: O(n) */
  search(data: TDataType): DoublyLinkedListNode<TDataType> {
    let node = this.dummyHead.nextNode;
    while (node && node !== this.dummyTail) {
      if (node.data === data) {
        return node;
      }
      node = node.nextNode;
    }
    return null;
  }

  /** check if the linked list is empty: O(1) */
  isEmpty(): boolean {
    return this.dummyHead.nextNode === this.dummyTail;
  }

  /** size of the linked list: O(n) */
  size(): number {
    let size = 0;
    let node = this.dummyHead.nextNode;
    while (node && node !== this.dummyTail) {
      size++;
      node = node.nextNode;
    }
    return size;
  }

  /** return an array: O(n) */
  toArray(): TDataType[] {
    const array = [];
    let node = this.dummyHead.nextNode;
    while (node && node !== this.dummyTail) {
      array.push(node.data);
      node = node.nextNode;
    }
    return array;
  }

  // ### popular operations on linked list ###

  /** reverse the linked list in place: O(n) */
  reverse(): void {
    if (this.isEmpty()) {
      return;
    }

    let node = this.dummyHead.nextNode;
    while (node && node !== this.dummyTail) {
      // for each node swap its previous and next
      const oldNext = node.nextNode;
      const oldPrevious = node.previousNode;
      node.previousNode = oldNext;
      node.nextNode = oldPrevious;
      node = oldNext;
    }
    const oldHead = this.dummyHead.nextNode; // new tail
    const oldTail = this.dummyTail.previousNode; // new head
    this.dummyHead.nextNode = oldTail;
    oldTail.previousNode = this.dummyHead;
    this.dummyTail.previousNode = oldHead;
    oldHead.nextNode = this.dummyTail;
  }
}
