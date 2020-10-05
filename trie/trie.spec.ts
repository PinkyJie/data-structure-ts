import { Trie } from './trie';

describe('Trie:', () => {
  it('should insert/search/delete/list words correctly', () => {
    const trie = new Trie();
    const words = ['app', 'apple', 'bag', 'bagg', 'baggage', 'cat', 'cater'];

    // insert all words into the trie
    words.forEach((word) => {
      trie.insertWord(word);
    });

    // list all words
    expect(trie.listAllWords()).toEqual(words);

    // search word
    words.forEach((word) => {
      expect(trie.searchWord(word)).toBe(true);
    });

    // delete word "app/apple"
    trie.deleteWord('app');
    expect(trie.searchWord('app')).toBe(false);
    expect(trie.searchWord('apple')).toBe(true);
    trie.deleteWord('apple');
    // no words start with "a" exist any more
    expect(trie.root.children[0]).toBeNull();

    // delete word "cat/cater"
    trie.deleteWord('cater');
    expect(trie.searchWord('cater')).toBe(false);
    expect(trie.searchWord('cat')).toBe(true);
    trie.deleteWord('cat');
    // no words start with "c" exist any more
    expect(trie.root.children[2]).toBeNull();

    // only "b" words left
    expect(trie.listAllWords()).toEqual(['bag', 'bagg', 'baggage']);

    // delete with recursive method
    trie.deleteWordRecursive('bagg');
    expect(trie.searchWord('bagg')).toBe(false);
    expect(trie.searchWord('bag')).toBe(true);
    expect(trie.searchWord('baggage')).toBe(true);
    trie.deleteWordRecursive('bag');
    expect(trie.listAllWords()).toEqual(['baggage']);
    trie.deleteWordRecursive('baggage');
    expect(trie.listAllWords()).toEqual([]);
  });
});
