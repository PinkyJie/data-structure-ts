import { GraphEdgeDirection, Graph, Vertex } from './graph';
import { bfsGraphTraversal, dfsGraphTraversal } from './traversal';

describe('Graph traversal: ', () => {
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [7, 6],
    [6, 8],
  ];

  it.each<
    [
      string,
      {
        type: GraphEdgeDirection;
        bfsResult: number[];
        dfsResult: number[];
      },
    ]
  >([
    [
      'undirected graph',
      {
        type: GraphEdgeDirection.Undirected,
        bfsResult: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        dfsResult: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    ],
    [
      'directed graph',
      {
        type: GraphEdgeDirection.Directed,
        bfsResult: [0, 1, 2, 3, 4, 5, 6, 8, 7],
        dfsResult: [0, 1, 2, 3, 4, 5, 6, 8, 7],
      },
    ],
  ])('should do traversal for %s', (_, { type, bfsResult, dfsResult }) => {
    const graph = new Graph(type, 9);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });

    // BFS
    const bfsArr: number[] = [];
    const bfsVisit = (vertex: Vertex): void => {
      bfsArr.push(vertex.id);
    };
    bfsGraphTraversal(graph, bfsVisit);
    expect(bfsArr).toEqual(bfsResult);

    // DFS
    const dfsArr: number[] = [];
    const dfsVisit = (vertex: Vertex): void => {
      dfsArr.push(vertex.id);
    };
    dfsGraphTraversal(graph, dfsVisit);
    expect(dfsArr).toEqual(dfsResult);
  });
});
