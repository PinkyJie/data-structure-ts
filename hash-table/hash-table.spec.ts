import { HashTable } from './hash-table';

describe('Hash Table:', () => {
  it('should hash with arithmetic modular as hash function', () => {
    const arithmeticModularHashFunc = (key: number, arrayLength: number): number => key % arrayLength;

    const hashTable = new HashTable<number, string>(5, arithmeticModularHashFunc);
    // set new items
    hashTable.setItem(0, 'aaa');
    hashTable.setItem(3, 'bbb');
    expect(hashTable.size).toBe(2);

    // get items
    expect(hashTable.getItem(0)).toBe('aaa');
    expect(hashTable.getItem(3)).toBe('bbb');
    expect(hashTable.getItem(2)).toBeUndefined();

    // update item
    hashTable.setItem(3, 'bbb1');
    expect(hashTable.getItem(3)).toBe('bbb1');
    expect(hashTable.size).toBe(2);

    // trigger resize: 5 * 0.6 = 3
    expect(hashTable.array.length).toBe(5);
    hashTable.setItem(8, 'ddd'); // 8 % 5 = 3
    expect(hashTable.array.length).toBe(10);
    expect(hashTable.getItem(8)).toBe('ddd');
    // after resize the existing ones can still be accessed
    expect(hashTable.getItem(0)).toBe('aaa');
    expect(hashTable.getItem(3)).toBe('bbb1');
    expect(hashTable.size).toBe(3);

    // check collision handling
    expect(hashTable.array[8].size()).toBe(1);
    hashTable.setItem(18, 'abc'); // 18 % 10 = 8
    hashTable.setItem(28, 'def'); // 28 % 10 = 8
    expect(hashTable.array[8].size()).toBe(3);
    expect(hashTable.size).toBe(5);

    // remove item
    hashTable.removeItem(5); // nothing happens if key is no existed
    expect(hashTable.size).toBe(5);
    hashTable.removeItem(18);
    expect(hashTable.getItem(18)).toBeUndefined();
    expect(hashTable.getItem(8)).toBe('ddd');
    expect(hashTable.getItem(28)).toBe('def');
    expect(hashTable.size).toBe(4);
  });
});
