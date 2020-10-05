import { SinglyLinkedList, SinglyLinkedListNode } from '../linked-list/singly-linked-list';

/**
 * Hash table
 *    - store the key/value pair in array
 *
 * Note: in Javascript we can use `{}` for hash table, here is
 * to demonstrate some basic conceptions of the implementation of a hash table
 * from the scratch.
 */
export class HashTable<KeyType, ValueType> {
  /**
   * The actual array which stores all the data, each array item
   * is a Singly Linked list in order to handle collisions: if
   * multiple items have the same hash key, just push them in the
   * same linked list.
   */
  array: SinglyLinkedList<{ key: KeyType; value: ValueType }>[];

  /**
   * A number less than 1 to indicate when to resize the `array`.
   * In order to reduce the chance of collisions, if curtain
   * percentage of the `array` space has been taken, we can create
   * a new array with double size to significantly reduce collisions.
   */
  resizeThreshold = 0.6;

  /** number of the items in the hash table */
  size = 0;

  /**
   * Hash function: generate a index of the `this.array` based on the `key`.
   *
   * Note: Pass the array length as 2nd parameter in case the hash function needs
   * to calculate the index based on the array's length, e.g. Arithmetic modular.
   */
  hashFunc: (key: KeyType, arrayLength: number) => number;

  constructor(defaultSize: number, hashFunc: (key: KeyType, arrayLength: number) => number) {
    // initialize the array with default size, by default each item is null
    this.array = new Array(defaultSize).fill(null);
    this.hashFunc = hashFunc;
  }

  /**
   * Double the array size and re-hash all the existing items.
   *
   * O(n) - need to re-hash every existing item
   */
  private _resize(): void {
    const newArray = new Array(this.array.length * 2).fill(null);
    this.array.forEach((item) => {
      if (item && !item.isEmpty()) {
        let node = item.dummyHead.nextNode;
        while (node) {
          const { key, value } = node.data;
          const newIndex = this.hashFunc(key, newArray.length);
          if (!newArray[newIndex]) {
            newArray[newIndex] = new SinglyLinkedList<{ key: KeyType; value: ValueType }>();
          }
          newArray[newIndex].insertAtTail({ key, value });
          node = node.nextNode;
        }
      }
    });
    this.array = newArray;
  }

  /**
   * Set the key/value pair.
   *
   * Average: O(1)
   * Worst: O(n) - insert item at the end of the linked list
   *
   * Note:
   *    - update the value if the key is already existed
   *    - for duplicate `index`, just insert them into the linked list.
   */
  setItem(key: KeyType, value: ValueType): void {
    const index = this.hashFunc(key, this.array.length);
    if (!this.array[index]) {
      this.array[index] = new SinglyLinkedList<{ key: KeyType; value: ValueType }>();
    }
    let parent = this.array[index].dummyHead;
    let node = parent.nextNode;
    let isKeyExisted = false;
    while (node) {
      if (node.data.key === key) {
        node.data.value = value;
        isKeyExisted = true;
        break;
      }
      parent = node;
      node = node.nextNode;
    }
    if (!isKeyExisted) {
      // `parent` now is the last node
      parent.nextNode = new SinglyLinkedListNode({ key, value });
      this.size++;
      if (this.size / this.array.length >= this.resizeThreshold) {
        this._resize();
      }
    }
  }

  /**
   * Get the value by key.
   *
   * Average: O(1)
   * Worst: O(n) - search in the linked list
   */
  getItem(key: KeyType): ValueType {
    const index = this.hashFunc(key, this.array.length);
    if (this.array[index] && !this.array[index].isEmpty()) {
      let node = this.array[index].dummyHead.nextNode;
      while (node) {
        if (node.data.key === key) {
          return node.data.value;
        }
        node = node.nextNode;
      }
    }
    // return undefined if the key can not be found
    return undefined;
  }

  /**
   * Remove the key.
   *
   * Average: O(1)
   * Worst: O(n) - remove item in the linked list
   */
  removeItem(key: KeyType): void {
    const index = this.hashFunc(key, this.array.length);
    if (this.array[index] && !this.array[index].isEmpty()) {
      let parent = this.array[index].dummyHead;
      let node = parent.nextNode;
      while (node) {
        if (node.data.key === key) {
          parent.nextNode = node.nextNode;
          this.size--;
          return;
        }
        parent = node;
        node = node.nextNode;
      }
    }
  }
}
