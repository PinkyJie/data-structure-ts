import { Graph, GraphEdgeDirection } from './graph';
import { detectCycleWithDFS, detectCycleWithDisjointSet } from './detect-cycle';

describe('Cycle detection:', () => {
  const edges1 = [
    [0, 1],
    [1, 2],
  ];

  const edges2 = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];

  const edges3 = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];

  const edges4 = [
    [0, 1],
    [1, 0],
  ];

  it.each<[string, { edges: number[][]; type: GraphEdgeDirection; func: (graph: Graph) => boolean; found: boolean }]>([
    [
      'not find cycle for undirected graph with disjoint set',
      {
        edges: edges1,
        type: GraphEdgeDirection.Undirected,
        func: detectCycleWithDisjointSet,
        found: false,
      },
    ],
    [
      'find cycle for undirected graph with disjoint set',
      {
        edges: edges2,
        type: GraphEdgeDirection.Undirected,
        func: detectCycleWithDisjointSet,
        found: true,
      },
    ],
    [
      'not find cycle for undirected graph with dfs',
      {
        edges: edges1,
        type: GraphEdgeDirection.Undirected,
        func: detectCycleWithDFS,
        found: false,
      },
    ],
    [
      'find cycle for undirected graph with dfs',
      {
        edges: edges2,
        type: GraphEdgeDirection.Undirected,
        func: detectCycleWithDFS,
        found: true,
      },
    ],
    [
      'not find cycle for directed graph with dfs #1',
      {
        edges: edges1,
        type: GraphEdgeDirection.Directed,
        func: detectCycleWithDFS,
        found: false,
      },
    ],
    [
      'not find cycle for directed graph with dfs #2',
      {
        edges: edges2,
        type: GraphEdgeDirection.Directed,
        func: detectCycleWithDFS,
        found: false,
      },
    ],
    [
      'find cycle for directed graph with dfs #1',
      {
        edges: edges3,
        type: GraphEdgeDirection.Directed,
        func: detectCycleWithDFS,
        found: true,
      },
    ],
    [
      'find cycle for directed graph with dfs #2',
      {
        edges: edges4,
        type: GraphEdgeDirection.Directed,
        func: detectCycleWithDFS,
        found: true,
      },
    ],
  ])('should %s', (_, { edges, type, func, found }) => {
    const graph = new Graph(type, 3);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });

    expect(func(graph)).toBe(found);
  });
});
