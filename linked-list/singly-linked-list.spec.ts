import { SinglyLinkedList } from './singly-linked-list';

describe('Singly linked list', () => {
  function genSinglyLinkedListFromArray(array: number[]): SinglyLinkedList<number> {
    const singlyLinkedList = new SinglyLinkedList<number>();
    array.forEach((item) => {
      singlyLinkedList.insertAtTail(item);
    });
    return singlyLinkedList;
  }

  describe('insertAtHead():', () => {
    it.each<[string, { list: number[]; dataToInsert: number; result: number[] }]>([
      [
        'for empty linked list',
        {
          list: [],
          dataToInsert: 1,
          result: [1],
        },
      ],
      [
        'for non-empty linked list',
        {
          list: [1, 2, 3],
          dataToInsert: 4,
          result: [4, 1, 2, 3],
        },
      ],
    ])('should insert data at head %s', (_, { list, dataToInsert, result }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      linkedList.insertAtHead(dataToInsert);
      expect(linkedList.toArray()).toEqual(result);
    });
  });

  describe('insertAtTail():', () => {
    it.each<[string, { list: number[]; dataToInsert: number; result: number[] }]>([
      [
        'for empty linked list',
        {
          list: [],
          dataToInsert: 1,
          result: [1],
        },
      ],
      [
        'for non-empty linked list',
        {
          list: [1, 2, 3],
          dataToInsert: 4,
          result: [1, 2, 3, 4],
        },
      ],
    ])('should insert data at tail %s', (_, { list, dataToInsert, result }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      linkedList.insertAtTail(dataToInsert);
      expect(linkedList.toArray()).toEqual(result);
    });
  });

  describe('deleteAtHead():', () => {
    it.each<[string, { list: number[]; result: number[] }]>([
      [
        'for one node linked list',
        {
          list: [1],
          result: [],
        },
      ],
      [
        'for multiple node linked list',
        {
          list: [1, 2, 3],
          result: [2, 3],
        },
      ],
    ])('should delete data at head %s', (_, { list, result }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      const returnNode = linkedList.deleteAtHead();
      expect(linkedList.toArray()).toEqual(result);
      expect(returnNode.data).toBe(list[0]);
    });
  });

  describe('deleteAtTail():', () => {
    it.each<[string, { list: number[]; result: number[] }]>([
      [
        'for one node linked list',
        {
          list: [1],
          result: [],
        },
      ],
      [
        'for multiple node linked list',
        {
          list: [1, 2, 3],
          result: [1, 2],
        },
      ],
    ])('should delete data at tail %s', (_, { list, result }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      const returnNode = linkedList.deleteAtTail();
      expect(linkedList.toArray()).toEqual(result);
      expect(returnNode.data).toBe(list[list.length - 1]);
    });
  });

  describe('delete():', () => {
    it.each<[string, { list: number[]; dataToDelete: number; result: number[] }]>([
      [
        'if it is the only node',
        {
          list: [1],
          dataToDelete: 1,
          result: [],
        },
      ],
      [
        'if it can be found at head',
        {
          list: [1, 2, 3],
          dataToDelete: 1,
          result: [2, 3],
        },
      ],
      [
        'if it can be found at tail',
        {
          list: [1, 2, 3],
          dataToDelete: 3,
          result: [1, 2],
        },
      ],
      [
        'if it can be found in the middle',
        {
          list: [1, 2, 3],
          dataToDelete: 2,
          result: [1, 3],
        },
      ],
    ])('should delete data %s', (_, { list, dataToDelete, result }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      const returnNode = linkedList.delete(dataToDelete);
      expect(linkedList.toArray()).toEqual(result);
      expect(returnNode.data).toBe(dataToDelete);
    });

    it('should return null if the data to be deleted can not be found', () => {
      const linkedList = genSinglyLinkedListFromArray([1, 2, 3, 4, 5]);
      const returnNode = linkedList.delete(7);
      expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
      expect(returnNode).toBeNull();
    });
  });

  describe('search():', () => {
    it.each<[string, { list: number[]; dataToSearch: number }]>([
      [
        'if it can be found at head',
        {
          list: [1, 2, 3],
          dataToSearch: 1,
        },
      ],
      [
        'if it can be found at tail',
        {
          list: [1, 2, 3],
          dataToSearch: 3,
        },
      ],
      [
        'if it can be found in the middle',
        {
          list: [1, 2, 3],
          dataToSearch: 2,
        },
      ],
    ])('should search data %s', (_, { list, dataToSearch }) => {
      const linkedList = genSinglyLinkedListFromArray(list);
      const returnNode = linkedList.search(dataToSearch);
      expect(returnNode.data).toBe(dataToSearch);
    });

    it('should return null if the data to be searched can not be found', () => {
      const linkedList = genSinglyLinkedListFromArray([1, 2, 3, 4, 5]);
      const returnNode = linkedList.search(7);
      expect(returnNode).toBeNull();
    });
  });

  describe('isEmpty():', () => {
    it('should check if the linked list is empty or not', () => {
      const list1 = new SinglyLinkedList<number>();
      expect(list1.isEmpty()).toBe(true);
      const list2 = genSinglyLinkedListFromArray([1]);
      expect(list2.isEmpty()).toBe(false);
      const list3 = genSinglyLinkedListFromArray([1, 2, 3]);
      expect(list3.isEmpty()).toBe(false);
    });
  });

  describe('size():', () => {
    it('should return the size of the linked list', () => {
      expect(genSinglyLinkedListFromArray([]).size()).toBe(0);
      for (let i = 1; i < 10; i++) {
        const list = new Array(i).fill(0).map(() => Math.floor(Math.random() * 40));
        const linkedList = genSinglyLinkedListFromArray(list);
        expect(linkedList.size()).toBe(list.length);
      }
    });
  });

  describe('reverse():', () => {
    it('should keep the linked list if it is empty or only has 1 node', () => {
      const emptyList = new SinglyLinkedList();
      emptyList.reverse();
      expect(emptyList.toArray()).toEqual([]);

      const oneNodeList = genSinglyLinkedListFromArray([1]);
      oneNodeList.reverse();
      expect(oneNodeList.toArray()).toEqual([1]);
    });

    it('should reverse linked list in place', () => {
      for (let i = 0; i < 5; i++) {
        const list = new Array(20).fill(0).map(() => Math.floor(Math.random() * 40));
        const linkedList = genSinglyLinkedListFromArray(list);
        linkedList.reverse();
        expect(linkedList.toArray()).toEqual(list.reverse());
      }
    });
  });

  describe('detectLoop():', () => {
    it('should return true if there is a loop in the linked list', () => {
      const list1 = genSinglyLinkedListFromArray([1, 2]);
      const node12 = list1.search(2);
      const node11 = list1.search(1);
      node12.nextNode = node11;
      // expect(list1.detectLoop()).toBe(true);

      const list2 = genSinglyLinkedListFromArray([1, 2, 3, 4, 5, 6]);
      const node26 = list2.search(6);
      const node24 = list2.search(4);
      node26.nextNode = node24;
      expect(list2.detectLoop()).toBe(true);
    });

    it('should return false if there is no loop in the linked list', () => {
      const list1 = new SinglyLinkedList<number>();
      expect(list1.detectLoop()).toBe(false);
      const list2 = genSinglyLinkedListFromArray([1]);
      expect(list2.detectLoop()).toBe(false);
      const list3 = genSinglyLinkedListFromArray([1, 2, 3]);
      expect(list3.detectLoop()).toBe(false);
    });
  });

  describe('findMiddleNode():', () => {
    it('should return the middle node of the linked list', () => {
      const list1 = new SinglyLinkedList<number>();
      expect(list1.findMiddleNode()).toBeNull();
      const list2 = genSinglyLinkedListFromArray([1]);
      expect(list2.findMiddleNode().data).toBe(1);
      const list3 = genSinglyLinkedListFromArray([1, 2]);
      expect(list3.findMiddleNode().data).toBe(2);
      const list4 = genSinglyLinkedListFromArray([1, 2, 3]);
      expect(list4.findMiddleNode().data).toBe(2);
      const list5 = genSinglyLinkedListFromArray([1, 2, 3, 4]);
      expect(list5.findMiddleNode().data).toBe(3);
      const list6 = genSinglyLinkedListFromArray([1, 2, 3, 4, 5]);
      expect(list6.findMiddleNode().data).toBe(3);
    });
  });
});
