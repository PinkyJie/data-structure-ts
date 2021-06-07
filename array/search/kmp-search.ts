/**
 * KMP(Knuth–Morris–Pratt) Search
 * https://www.youtube.com/watch?v=4jY57Ehc14Y
 *
 * O(n) for worst case
 *
 * KMP is mainly used for string matching, e.g. match `pattern` [0...m] in `text` [0...n].
 * For the worst case (match happens at the end of `text`, e.g. match `aaab` in
 * `aaaaaaaaab`), the original search algorithm will try to match the `pattern` for each
 * character in `text`, which will cost O(m(n-m+1)), while KMP can use the previously
 * partial matching information, only costs O(n + m).
 */
export function kmpSearch(text: string, pattern: string, matchOne = true): number[] {
  const m = pattern.length;
  const lpsTable = _buildLPSTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  const matchedIndices = [];
  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      textIndex++;
      patternIndex++;
    } else if (patternIndex > 0) {
      patternIndex = lpsTable[patternIndex - 1];
    } else {
      textIndex++;
    }
    if (patternIndex === m) {
      matchedIndices.push(textIndex - m);
      if (matchOne) {
        break;
      }
      // Treat it as a mismatch and continue to match against remaining `text`.
      patternIndex = lpsTable[patternIndex - 1];
    }
  }
  return matchedIndices;
}

/**
 * Time: O(m), Space: O(m)
 *
 * LPS table: Longest prefix which is also a suffix
 * a table with m elements, each element is a "length" of the LPS, to calculate index k,
 * consider elements in `pattern` from [0...k], what is the longest prefix which can also
 * be the suffix, e.g. if the pattern [0...k] is "abcdab", then longest prefix which
 * can also be the suffix is "ab", so the index k of the LPS table is 2, the length of "ab".
 * From the definition here we can also conclude that the first element in LPS table are always
 * 0, because for 1 character, there is no prefix/suffix thing.
 *
 * How to use LPS table: if position k does not match, the next comparison between `pattern`
 * and `text` can happen at `pattern` index retrieved from LPS table [k-1]. Use the example
 * above, if position k+1 does not match, then we can go back to position 2 in the `pattern`,
 * because if "x" (k+1) in "abcdabx" does not match, then "ab" before "x" are guaranteed to
 * be matched previously, we can restart the comparison from position 2, which is "c" in "abcdab".
 *
 */
function _buildLPSTable(pattern: string): number[] {
  const m = pattern.length;
  const lpsTable = new Array(m).fill(0);
  let i = 1;
  /**
   * `lenOfLPS` has 2 meanings:
   *  - the len of the LPS now
   *  - the index of the next comparison
   */
  let lenOfLPS = 0;
  while (i < m) {
    if (pattern[i] === pattern[lenOfLPS]) {
      lpsTable[i] = lenOfLPS + 1;
      i++;
      lenOfLPS++;
    } else if (lenOfLPS > 0) {
      /**
       * consider this pattern:
       *  a  a  b  a  a  a  c
       *  0  1  0 (1)
       * without this "if branch", the above value in parenthesis would be 2 which is wrong
       *
       * If current position does not match, but `lenOfLPS > 0`, which means at least last one
       * comparison is equaled (that's how `lenOfLPS++` happens), so we can't simply set
       * `lenOfLPS` to 0, because we don't want to restart the comparison from 0 again. How do
       * we know where to restart? The LPS table for position `lenOfLPS - 1` is already calculated,
       * we can move the `lenOfLPS` to that index, and restart comparison, this is just like
       * trying to match [0...lenOfLPS] in `pattern`.
       */
      lenOfLPS = lpsTable[lenOfLPS - 1];
    } else {
      lpsTable[i] = 0;
      i++;
    }
  }
  return lpsTable;
}
