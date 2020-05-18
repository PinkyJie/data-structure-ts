import { Graph } from './graph';
import { DisjointSet } from './disjoint-set';

/**
 * Find cycle in undirected graph: Disjoint set O(V+E)
 */
export function detectCycleWithDisjointSet(graph: Graph): boolean {
  // for undirected graph, we need to make sure edge is only used once
  const visitedEdges: {
    [vertex: string]: number;
  } = {};

  const disjointSet = new DisjointSet(graph.numberOfVertices);
  for (let i = 0; i < graph.numberOfVertices; i++) {
    const rootForI = disjointSet.find(i);
    let node = graph.edges[i].dummyHead.nextNode;
    while (node) {
      if (visitedEdges[node.data] !== i) {
        visitedEdges[i] = node.data;
        const rootForNode = disjointSet.find(node.data);
        if (rootForI === rootForNode) {
          return true;
        }
        disjointSet.union(i, node.data);
      }
      node = node.nextNode;
    }
  }

  return false;
}

/**
 * Find cycle in graph: DFS O(V+E), works for both directed and undirected graph
 */
export function detectCycleWithDFS(graph: Graph): boolean {
  /**
   * DFS for this vertex is not finished yet, which means all the connected vertices are still
   * being visited now.
   */
  const visiting: boolean[] = [];

  /**
   * DFS for this vertex is finished already, which means all the connected vertices are
   * already visited.
   */
  const fullyVisited: boolean[] = [];

  // for undirected graph, we need to make sure edge is only used once
  const visitedEdges: {
    [vertex: string]: number;
  } = {};

  for (let i = 0; i < graph.numberOfVertices; i++) {
    const result = _detectCycleFromSource(graph, i, visiting, fullyVisited, visitedEdges);
    if (result) {
      return true;
    }
  }
  return false;
}

function _detectCycleFromSource(
  graph: Graph,
  source: number,
  visiting: boolean[],
  fullyVisited: boolean[],
  visitedEdges: {
    [vertex: string]: number;
  },
): boolean {
  // skip vertex if all its connected vertices are being visited already
  if (fullyVisited[source]) {
    return false;
  }
  // if the same vertex is encountered when it is still in visiting status, then a cycle is found
  if (visiting[source]) {
    return true;
  }
  visiting[source] = true;
  let node = graph.edges[source].dummyHead.nextNode;
  while (node) {
    // for undirected graph, we need to make sure edge is only used once
    if (!graph.isUndirected() || visitedEdges[node.data] !== source) {
      visitedEdges[source] = node.data;
      const result = _detectCycleFromSource(graph, node.data, visiting, fullyVisited, visitedEdges);
      if (result) {
        return true;
      }
    }
    node = node.nextNode;
  }
  // all source's connected vertices are visited already
  visiting[source] = false;
  fullyVisited[source] = true;

  return false;
}
