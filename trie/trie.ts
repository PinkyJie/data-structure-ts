export class TrieNode {
  /** the character this node represents */
  char: string;
  /** other nodes this node points to, can be null */
  children: TrieNode[];
  /** indicate if this node is the end of a word */
  isEndWord: boolean;

  constructor(char: string) {
    this.char = char;
    // English words only have 26 characters
    this.children = new Array(26).fill(null);
    this.isEndWord = false;
  }
}

/**
 * Trie:
 *    - a real tree structure in storage, commonly used for auto complete, spelling
 * check, phone contact search, where we need to use prefix string to match a lot of
 * words
 *    - each node represents a character (a,b,c...), and can point to other nodes
 *    - think it as a dictionary which stores a lot of words, e.g. the
 * following trie stores 2 words ("bag" and "cat"), "T" denotes `isEndWord = true`,
 * means this node is the end of a valid word
 *             root
 *     ...    /    \   ....
 *            b    c
 *            |    |
 *            a    a
 *            |    |
 *            g(T) t(T)
 *     - if there are 2 words sharing the same prefix, they will share the
 * same prefix nodes in the trie, e.g. "bag" and "baggage" will share "b", "a", "g"
 *
 * Space: O(ln) - `l`: the average length of the words, `n`: number of the words
 */
export class Trie {
  /**
   * dummy root node, does not store anything, its children represent the first
   * valid chars for the all the  words the trie stores
   */
  root: TrieNode;

  constructor() {
    this.root = new TrieNode(null);
  }

  /** O(l) - `l`: length of the word */
  insertWord(word: string): void {
    let node = this.root;
    word.split('').forEach((char) => {
      const childIndex = _getChildIndexFromChar(char);
      if (!node.children[childIndex]) {
        node.children[childIndex] = new TrieNode(char);
      }
      node = node.children[childIndex];
    });
    node.isEndWord = true;
  }

  /** O(l) - `l`: length of the word */
  searchWord(word: string): boolean {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const childIndex = _getChildIndexFromChar(char);
      node = node.children[childIndex];
      if (!node) {
        return false;
      }
    }
    // the last char node
    return node.isEndWord;
  }

  /** O(l) - `l`: length of the word */
  deleteWord(word: string): void {
    // do nothing if there is no such word in the trie
    if (!this.searchWord(word)) {
      return;
    }

    let node = this.root;
    const nodesOnPath = [this.root];
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const childIndex = _getChildIndexFromChar(char);
      node = node.children[childIndex];
      nodesOnPath.push(node);
    }
    // the last char node
    node.isEndWord = false;
    /**
     * Check all the nodes visited on the path to see if we need to remove them:
     *    - if node is not a end of word, or node has no children, then delete it
     *    - we need to check all the nodes on the path one by one upwards (Stack)
     * because we need to do delete from the parent node (previous index)
     */
    while (nodesOnPath.length > 0) {
      const pathNode = nodesOnPath.pop();
      if (pathNode.isEndWord) {
        break;
      }
      const hasNonNullChild = pathNode.children.some((child) => !!child);
      if (hasNonNullChild) {
        break;
      }
      // delete pathNode's parent
      nodesOnPath[nodesOnPath.length - 1].children[_getChildIndexFromChar(pathNode.char)] = null;
    }
  }

  deleteWordRecursive(word: string): void {
    // do nothing if there is no such word in the trie
    if (!this.searchWord(word)) {
      return;
    }
    // -1 as initial cause root does not store anything
    _deleteChar(this.root, word, -1);
  }

  /** O(ln) */
  listAllWords(): string[] {
    const words: string[] = [];
    _constructWord(this.root, '', words);
    return words;
  }
}

function _getChildIndexFromChar(char: string): number {
  return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

/** DFS to construct all words */
function _constructWord(currentNode: TrieNode, partialWord: string, words: string[]): void {
  // root node has no `char`
  const newPartialWord = currentNode.char ? `${partialWord}${currentNode.char}` : partialWord;
  if (currentNode.isEndWord) {
    words.push(newPartialWord);
  }
  currentNode.children.forEach((nextNode) => {
    if (nextNode) {
      _constructWord(nextNode, newPartialWord, words);
    }
  });
}

function _deleteChar(node: TrieNode, word: string, index: number): boolean {
  if (index === word.length - 1) {
    // end of the word
    node.isEndWord = false;
    // tell the caller if we should delete this node or not: no children -> delete
    return !node.children.some((child) => !!child);
  }
  const childIndex = _getChildIndexFromChar(word.charAt(index + 1));
  // having this because node needs to be deleted from its parent
  const shouldDelete = _deleteChar(node.children[childIndex], word, index + 1);
  if (shouldDelete && !node.children[childIndex].isEndWord) {
    node.children[childIndex] = null;
    return !node.isEndWord && !node.children.some((child) => !!child);
  }
  // if child node should not be deleted, then obviously `node` should not be delete
  return false;
}
