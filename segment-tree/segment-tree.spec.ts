import { SegmentTree } from './segment-tree';

describe('Segment Tree:', () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  it('should calculate ranged sum', () => {
    const calcSum = (a: number, b: number): number => a + b;
    const segmentTree = new SegmentTree(calcSum);
    segmentTree.buildTree(array);

    // check initial ranged sum
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0 + 1 + 2);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(1 + 2 + 3 + 4 + 5);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(3 + 4);
    expect(segmentTree.queryRangedAggregation(5, 9)).toBe(5 + 6 + 7 + 8 + 9);
    expect(segmentTree.queryRangedAggregation(9, 9)).toBe(9);

    // update index 3 to 13
    segmentTree.update(3, 13);
    expect(segmentTree.queryRangedAggregation(3, 3)).toBe(13);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0 + 1 + 2);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(1 + 2 + 13 + 4 + 5);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(13 + 4);

    // update index 8 to 18
    segmentTree.update(8, 18);
    expect(segmentTree.queryRangedAggregation(8, 8)).toBe(18);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0 + 1 + 2);
    expect(segmentTree.queryRangedAggregation(7, 9)).toBe(7 + 18 + 9);
  });

  it('should calculate ranged minimum', () => {
    const calcMin = (a: number, b: number): number => Math.min(a, b);
    const segmentTree = new SegmentTree(calcMin);
    segmentTree.buildTree(array);

    // check initial ranged sum
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(1);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(3);
    expect(segmentTree.queryRangedAggregation(5, 9)).toBe(5);
    expect(segmentTree.queryRangedAggregation(9, 9)).toBe(9);

    // update index 3 to 13
    segmentTree.update(3, 13);
    expect(segmentTree.queryRangedAggregation(3, 3)).toBe(13);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(1);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(4);
    expect(segmentTree.queryRangedAggregation(3, 9)).toBe(4);

    // update index 8 to 18
    segmentTree.update(8, 18);
    expect(segmentTree.queryRangedAggregation(8, 8)).toBe(18);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(0);
    expect(segmentTree.queryRangedAggregation(3, 9)).toBe(4);
    expect(segmentTree.queryRangedAggregation(8, 9)).toBe(9);
  });

  it('should calculate ranged maximum', () => {
    const calcMax = (a: number, b: number): number => Math.max(a, b);
    const segmentTree = new SegmentTree(calcMax);
    segmentTree.buildTree(array);

    // check initial ranged sum
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(2);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(5);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(4);
    expect(segmentTree.queryRangedAggregation(5, 9)).toBe(9);
    expect(segmentTree.queryRangedAggregation(9, 9)).toBe(9);

    // update index 3 to 13
    segmentTree.update(3, 13);
    expect(segmentTree.queryRangedAggregation(3, 3)).toBe(13);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(2);
    expect(segmentTree.queryRangedAggregation(1, 5)).toBe(13);
    expect(segmentTree.queryRangedAggregation(3, 4)).toBe(13);

    // update index 8 to 18
    segmentTree.update(8, 18);
    expect(segmentTree.queryRangedAggregation(8, 8)).toBe(18);
    expect(segmentTree.queryRangedAggregation(0, 2)).toBe(2);
    expect(segmentTree.queryRangedAggregation(7, 9)).toBe(18);
    expect(segmentTree.queryRangedAggregation(3, 9)).toBe(18);
  });
});
