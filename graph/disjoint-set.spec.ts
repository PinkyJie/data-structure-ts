import { DisjointSet } from './disjoint-set';

describe('Disjoint Set:', () => {
  it('should detect circle in undirected graph', () => {
    const disjointSet = new DisjointSet(4);
    // add edges
    disjointSet.union(0, 1);
    expect(disjointSet.find(0)).toBe(1);

    disjointSet.union(1, 2);
    expect(disjointSet.find(0)).toBe(1);
    expect(disjointSet.find(1)).toBe(1);
    expect(disjointSet.find(2)).toBe(1);

    disjointSet.union(2, 3);
    expect(disjointSet.find(0)).toBe(1);
    expect(disjointSet.find(1)).toBe(1);
    expect(disjointSet.find(2)).toBe(1);
    expect(disjointSet.find(3)).toBe(1);

    disjointSet.union(0, 3);
    expect(disjointSet.find(0)).toBe(1);
    expect(disjointSet.find(1)).toBe(1);
    expect(disjointSet.find(2)).toBe(1);
    expect(disjointSet.find(3)).toBe(1);
  });
});
