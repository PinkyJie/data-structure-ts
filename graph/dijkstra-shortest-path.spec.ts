import { Graph, GraphEdgeDirection } from './graph';
import { findDijkstraShortestPath } from './dijkstra-shortest-path';

describe('Dijkstra Shortest Path:', () => {
  /**
   *               (2)
   *        [1]B ------- C[2]
   *       (5)/           \
   *         /     (9)     \(3)
   *     [0]A ------------- D[3]
   *        \              /
   *      (2)\            /(2)
   *       [4]E -------- F[5]
   *               (3)
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

  it.each<
    [
      string,
      {
        sourceVertexId: number;
        resultDistanceMap: {
          [targetVertexLabel: string]: number;
        };
        resultPathMap: { [targetVertexLabel: string]: string };
      },
    ]
  >([
    [
      'vertex A',
      {
        sourceVertexId: 0,
        resultDistanceMap: {
          A: 0,
          E: 2,
          B: 5,
          F: 5,
          C: 7,
          D: 7,
        },
        resultPathMap: {
          A: 'A',
          B: 'A,B',
          D: 'A,E,F,D',
          E: 'A,E',
          F: 'A,E,F',
          C: 'A,B,C',
        },
      },
    ],
    [
      'vertex C',
      {
        sourceVertexId: 2,
        resultDistanceMap: {
          C: 0,
          B: 2,
          D: 3,
          F: 5,
          A: 7,
          E: 8,
        },
        resultPathMap: {
          C: 'C',
          B: 'C,B',
          D: 'C,D',
          A: 'C,B,A',
          F: 'C,D,F',
          E: 'C,D,F,E',
        },
      },
    ],
  ])(
    'should find the shortest single sourced path from %s',
    (_, { sourceVertexId, resultDistanceMap, resultPathMap }) => {
      const graph = new Graph(GraphEdgeDirection.Undirected, 6);
      edges.forEach((edge) => {
        graph.addEdge(edge[0], edge[1], edge[2]);
      });
      // assign label
      graph.vertices.forEach((vertex) => {
        vertex.label = String.fromCharCode('A'.charCodeAt(0) + vertex.id);
      });

      // distance from source vertex A
      const { distanceMap, parentMap } = findDijkstraShortestPath(graph, sourceVertexId);
      expect(distanceMap).toEqual(resultDistanceMap);

      // calculate path
      const pathMap: { [targetVertexLabel: string]: string } = {};
      graph.vertices.forEach((vertex) => {
        const pathArray = [vertex.label];
        let parentVertex = parentMap[vertex.label];
        while (parentVertex) {
          pathArray.push(parentVertex.label);
          parentVertex = parentMap[parentVertex.label];
        }
        pathMap[vertex.label] = pathArray.reverse().join(',');
      });
      expect(pathMap).toEqual(resultPathMap);
    },
  );
});
