import { Graph } from './graph';

/**
 * Eulerian Path for directed graph: find a path which can traverse all the
 * edges exactly once.
 *
 * https://www.youtube.com/watch?v=8MpoO2zA2l4
 */
export function findEulerianPathInDirectedGraph(graph: Graph): number[] {
  const { inDegrees, outDegrees } = _calculateInOutDegrees(graph);
  if (!_hasEulerianPath(inDegrees, outDegrees)) {
    return null;
  }
  const startVertexId = _findStartVertexId(inDegrees, outDegrees);
  const paths: number[] = [];
  _dfs(graph, startVertexId, paths);
  return paths;
}

function _calculateInOutDegrees(graph: Graph): {
  inDegrees: number[];
  outDegrees: number[];
} {
  const inDegrees: number[] = new Array(graph.numberOfVertices).fill(0);
  const outDegrees: number[] = new Array(graph.numberOfVertices).fill(0);
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    const vertex = graph.vertices[vertexId];
    let node = vertex.edges.dummyHead.nextNode;
    while (node) {
      outDegrees[vertexId]++;
      inDegrees[node.data.targetVertex.id]++;
      node = node.nextNode;
    }
  }
  return {
    inDegrees,
    outDegrees,
  };
}

/**
 * For directed graph, if eulerian path is existed, there must be:
 *    - at most 1 vertex which meets: outDegree - inDegree = 1 (path start vertex)
 *    - at most 1 vertex which meets: inDegree - outDegree = 1 (path end vertex)
 *    - all remaining vertices meet: inDegree = outDegree
 *
 * Note: if all vertices have the same inDegree and outDegree, any vertex can be
 * path start vertex.
 */
function _hasEulerianPath(inDegrees: number[], outDegrees: number[]): boolean {
  let startNodes = 0;
  let endNodes = 0;
  for (let i = 0; i < inDegrees.length; i++) {
    if (inDegrees[i] - outDegrees[i] > 1 || outDegrees[i] - inDegrees[i] > 1) {
      return false;
    }
    if (outDegrees[i] - inDegrees[i] === 1) {
      startNodes++;
    } else if (inDegrees[i] - outDegrees[i] === 1) {
      endNodes++;
    }
  }
  return (startNodes === 0 && endNodes === 0) || (startNodes === 1 && endNodes === 1);
}

function _findStartVertexId(inDegrees: number[], outDegrees: number[]): number {
  for (let i = 0; i < inDegrees.length; i++) {
    if (outDegrees[i] - inDegrees[i] === 1) {
      return i;
    }
  }
  /**
   * Find any vertex whose out degree is larger than 0 as start vertex.
   * In case there is an isolated vertex (inDegree = 0, outDegree = 0)
   */
  return outDegrees.findIndex((degree) => degree > 0);
}

/**
 * How to find eulerian path: starting from vertex here, do dfs to remove the
 * vertex after it's being visited (actually it's the edge being removed), until
 * we find the vertex which does not have any connected edges any more, then
 * this vertex must be the path end vertex. After that, we back trace to the
 * last visited vertex, repeat this process.
 */
function _dfs(graph: Graph, vertexId: number, paths: number[]): void {
  const vertex = graph.vertices[vertexId];
  while (!vertex.edges.isEmpty()) {
    const nextNode = vertex.edges.deleteAtHead();
    _dfs(graph, nextNode.data.targetVertex.id, paths);
  }
  paths.unshift(vertexId);
}
