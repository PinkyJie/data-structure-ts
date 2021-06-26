/**
 * Disjoint set is mainly used for circle detection in undirected graph.
 */
export class DisjointSet {
  /**
   * `parents` array: index is the vertex, value is its parent vertex.
   * e.g. if there is an edge [1,0] (1 -> 0) then vertex 0's parent is vertex 1.
   */
  private parents: number[] = [];

  /**
   * `sizes` array: by default all vertices have size 1 (only has 1 vertex),
   * when we have a edge [1, 0], we should decide who should be the new parent based on
   * their existing parent vertex's size:
   *    - if the two parents have the same sizes (e.g. for 1st edge, they are both 1),
   * we do `parents[P0] = P1`, then `sizes[P1] += sizes[P0]`, cause we make P1 as P0's
   * parent (P1 -> P0), we need to add P0's size on P1
   *    - if the two parents have different sizes, then the one with larger size should
   * be the parent.
   *
   * This enhancement is called `balancing optimization`, if we think the graph as a
   * tree, this will reduce the height of the tree, which will accelerate the speed
   * for `find()`.
   */
  private sizes: number[] = [];

  constructor(numberOfVertices: number) {
    for (let i = 0; i < numberOfVertices; i++) {
      // by default each vertex's parent is itself
      this.parents.push(i);
      this.sizes.push(1);
    }
  }

  /**
   * When there is an edge in the graph, these 2 vertices can be `union`: find the
   * parents for these 2 vertices and update the `parents` array. O(1)
   */
  union(source: number, destination: number): void {
    const parentForSource = this.find(source);
    const parentForDest = this.find(destination);

    if (parentForSource === parentForDest) {
      return;
    }

    if (this.sizes[parentForSource] > this.sizes[parentForDest]) {
      this.parents[parentForDest] = parentForSource;
      this.sizes[parentForSource] += this.sizes[parentForDest];
    } else {
      this.parents[parentForSource] = parentForDest;
      this.sizes[parentForDest] += this.sizes[parentForSource];
    }
  }

  /** Find the parent vertex of the passed in `vertex`: O(1) amortized */
  find(vertex: number): number {
    while (this.parents[vertex] !== vertex) {
      // keep updating vertex's parent to its parent's parent, path compression
      this.parents[vertex] = this.parents[this.parents[vertex]];
      vertex = this.parents[vertex];
    }
    // we can return `vertex` directly because it's equal to `parents[vertex]`
    return vertex;
  }
}
