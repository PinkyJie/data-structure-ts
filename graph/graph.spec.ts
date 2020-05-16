import { Graph, GraphEdgeDirection } from './graph';

describe('Graph:', () => {
  const edges = [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
  ];

  it.each<[string, { edges: number[][]; type: GraphEdgeDirection; resultString: string }]>([
    [
      'undirected graph',
      {
        edges,
        type: GraphEdgeDirection.Undirected,
        resultString: '|0|->[1]->[2]->null,|1|->[0]->[2]->[3]->null,|2|->[0]->[1]->null,|3|->[1]->null,',
      },
    ],
    [
      'directed graph',
      {
        edges,
        type: GraphEdgeDirection.Directed,
        resultString: '|0|->[1]->[2]->null,|1|->[2]->[3]->null,|2|->null,|3|->null,',
      },
    ],
  ])('should support adding edges for %s', (_, { edges, type, resultString }) => {
    const graph = new Graph(type, 4);
    edges.forEach((edge) => {
      graph.addEdge(edge[0], edge[1]);
    });
    expect(graph.toString()).toBe(resultString);
  });
});
