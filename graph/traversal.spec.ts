import { GraphEdgeDirection, Graph } from './graph';
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
        edges: number[][];
        type: GraphEdgeDirection;
        bfsResult: number[];
        dfsResult: number[];
      },
    ]
  >([
    [
      'undirected graph',
      {
        edges,
        type: GraphEdgeDirection.Undirected,
        bfsResult: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        dfsResult: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
    ],
    [
      'directed graph',
      {
        edges,
        type: GraphEdgeDirection.Directed,
        bfsResult: [0, 1, 2, 3, 4, 5, 6, 8, 7],
        dfsResult: [0, 1, 2, 3, 4, 5, 6, 8, 7],
      },
    ],
  ])('should do traversal for %s', (_, { edges, type, bfsResult, dfsResult }) => {
    const graph = new Graph(type, 9);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });

    // BFS
    const bfsArr: number[] = [];
    const bfsVisit = (vertex: number): void => {
      bfsArr.push(vertex);
    };
    bfsGraphTraversal(graph, bfsVisit);
    expect(bfsArr).toEqual(bfsResult);

    // DFS
    const dfsArr: number[] = [];
    const dfsVisit = (vertex: number): void => {
      dfsArr.push(vertex);
    };
    dfsGraphTraversal(graph, dfsVisit);
    expect(dfsArr).toEqual(dfsResult);
  });
});
