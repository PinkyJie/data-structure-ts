import { Graph } from './graph';

/**
 * Eulerian Path for directed graph: find a path which can traverse all the
 * edges exactly once.
 */
export function findEulerianPathInDirectedGraph(graph: Graph): number[] {
  const { inDegrees, outDegrees } = _calculateInOutDegrees(graph);
  if (!_hasEulerianPath(inDegrees, outDegrees)) {
    return null;
  }
  const startVertex = _findStartVertex(inDegrees, outDegrees);
  const paths: number[] = [];
  _dfs(graph, startVertex, paths);
  return paths;
}

function _calculateInOutDegrees(
  graph: Graph,
): {
  inDegrees: number[];
  outDegrees: number[];
} {
  const inDegrees: number[] = Array.from({ length: graph.numberOfVertices }, () => 0);
  const outDegrees: number[] = Array.from({ length: graph.numberOfVertices }, () => 0);
  for (let i = 0; i < graph.numberOfVertices; i++) {
    let node = graph.edges[i].dummyHead.nextNode;
    while (node) {
      outDegrees[i]++;
      inDegrees[node.data]++;
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

function _findStartVertex(inDegrees: number[], outDegrees: number[]): number {
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

function _dfs(graph: Graph, vertex: number, paths: number[]): void {
  while (!graph.edges[vertex].isEmpty()) {
    const nextNode = graph.edges[vertex].deleteAtHead();
    _dfs(graph, nextNode.data, paths);
  }
  paths.unshift(vertex);
}
