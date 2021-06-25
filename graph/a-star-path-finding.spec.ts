import { Graph, GraphEdgeDirection } from './graph';
import { aStarPathFinding } from './a-star-path-finding';

describe('A* Path Finding:', () => {
  /**
   *                  (2)
   *        [1]B(3) ------- C[2](3)
   *       (5)/               \
   *         /        (9)      \(3)
   *     [0]A(3) ------------- D[3](1)
   *        \                  /
   *      (2)\                /(2)
   *       [4]E(2) -------- F[5](0)
   *                  (3)
   *
   * A is the source, F is the target.
   * [0]A(4) means the id of vertex A is 0 and its heuristic value is 4, for test purpose,
   * we just use the `ceil(real shortest distance / 2)` as the value of heuristic value.
   */
  const edges = [
    [0, 1, 5],
    [0, 3, 9],
    [0, 4, 2],
    [1, 2, 2],
    [2, 3, 3],
    [3, 5, 2],
    [4, 5, 3],
  ];
  const heuristicValues = [3, 3, 3, 1, 2, 0];
  const resultPath = 'A,E,F';
  const resultDistance = 5;

  it('should find the shortest path from A to F', () => {
    const graph = new Graph(GraphEdgeDirection.Undirected, 6);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1], edge[2]);
    });
    // assign label
    graph.vertices.forEach((vertex) => {
      vertex.label = String.fromCharCode('A'.charCodeAt(0) + vertex.id);
    });

    // distance from source vertex A
    const { shortestPath, shortestDistance } = aStarPathFinding(graph, 0, 5, heuristicValues);
    expect(shortestPath.join(',')).toEqual(resultPath);
    expect(shortestDistance).toEqual(resultDistance);
  });
});
