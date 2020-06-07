import { Graph, GraphEdgeDirection } from './graph';
import { findEulerianPathInDirectedGraph } from './eulerian-path';

describe('Eulerian path:', () => {
  it('should return null if a directed graph has no eulerian path', () => {
    const graph = new Graph(GraphEdgeDirection.Directed, 5);
    graph.addEdge(0, 1);
    graph.addEdge(1, 2);
    graph.addEdge(1, 4);
    expect(findEulerianPathInDirectedGraph(graph)).toBeNull();
  });

  it.each<{ edges: number[][]; numberOfVertices: number; resultPath: number[] }>([
    {
      // vertex 0 is an isolated vertex
      edges: [
        [1, 2],
        [1, 3],
        [2, 2],
        [2, 4],
        [2, 4],
        [3, 1],
        [3, 2],
        [3, 5],
        [4, 3],
        [4, 6],
        [5, 6],
        [6, 3],
      ],
      numberOfVertices: 7,
      resultPath: [1, 2, 2, 4, 3, 1, 3, 2, 4, 6, 3, 5, 6],
    },
    {
      edges: [
        [0, 1],
        [1, 2],
        [1, 4],
        [1, 3],
        [2, 1],
        [4, 1],
      ],
      numberOfVertices: 5,
      resultPath: [0, 1, 2, 1, 4, 1, 3],
    },
  ])('should return eulerian path for a directed graph %#', ({ edges, numberOfVertices, resultPath }) => {
    const graph = new Graph(GraphEdgeDirection.Directed, numberOfVertices);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });
    const paths = findEulerianPathInDirectedGraph(graph);
    expect(paths).toEqual(resultPath);
  });
});
