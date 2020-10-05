/**
 * Disjoint set is mainly used for circle detection in undirected graph.
 */
export class DisjointSet {
  /**
   * `roots` array: index is the vertex, value is their root vertex.
   * e.g. if there is an edge [0,1], then vertex 0's root is vertex 1.
   */
  private roots: number[] = [];

  /**
   * `ranks` array: by default all vertices have rank 0, when we have a edge [0, 1],
   * we should decide who is whose root by their ranks:
   *    - if the two vertices have the same rank (e.g. for 1st edge, they are both 0),
   * we do `roots[0] = 1`, then `ranks[1]++` (root vertex's rank gets increased)
   *    - if the two vertices have different ranks, then the one with larger rank should
   * be the root.
   *
   * This enhancement is called `path compression`, if we think the graph as a tree, this
   * will reduce the height of the tree, which will accelerate the speed for `find()`.
   */
  private ranks: number[] = [];

  constructor(numberOfVertices: number) {
    for (let i = 0; i < numberOfVertices; i++) {
      // by default each vertex's root is itself
      this.roots.push(i);
      this.ranks.push(0);
    }
  }

  /**
   * When there is an edge in the graph, these 2 vertices can be `union`: find the
   * roots for these 2 vertices and update the `roots` array. O(1)
   */
  union(source: number, destination: number): void {
    const rootForSource = this.find(source);
    const rootForDest = this.find(destination);

    if (this.ranks[rootForSource] > this.ranks[rootForDest]) {
      this.roots[rootForDest] = rootForSource;
    } else {
      this.roots[rootForSource] = rootForDest;
      if (this.ranks[rootForSource] === this.ranks[rootForDest]) {
        this.ranks[rootForDest]++;
      }
    }
  }

  /** Find the root vertex of the passed in `vertex`: O(1) amortized */
  find(vertex: number): number {
    if (this.roots[vertex] !== vertex) {
      // keep updating vertex's root to its root's root, path compression
      this.roots[vertex] = this.find(this.roots[vertex]);
    }
    return this.roots[vertex];
  }
}
