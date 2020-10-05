import { Graph } from './graph';
import { DisjointSet } from './disjoint-set';

/**
 * Find cycle in undirected graph: Disjoint set O(V+E)
 */
export function detectCycleWithDisjointSet(graph: Graph): boolean {
  // for undirected graph, we need to make sure edge is only used once
  const visitedEdges: {
    [vertexId: string]: number;
  } = {};

  const disjointSet = new DisjointSet(graph.numberOfVertices);
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    const rootForVertex = disjointSet.find(vertexId);
    const vertex = graph.vertices[vertexId];
    let node = vertex.edges.dummyHead.nextNode;
    while (node) {
      const targetVertexId = node.data.targetVertex.id;
      if (visitedEdges[targetVertexId] !== vertexId) {
        visitedEdges[vertexId] = targetVertexId;
        const rootForNode = disjointSet.find(targetVertexId);
        if (rootForVertex === rootForNode) {
          return true;
        }
        disjointSet.union(vertexId, targetVertexId);
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

  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    const result = _detectCycleFromSource(graph, vertexId, visiting, fullyVisited, visitedEdges);
    if (result) {
      return true;
    }
  }
  return false;
}

function _detectCycleFromSource(
  graph: Graph,
  sourceVertexId: number,
  visiting: boolean[],
  fullyVisited: boolean[],
  visitedEdges: {
    [vertex: string]: number;
  },
): boolean {
  // skip vertex if all its connected vertices are being visited already
  if (fullyVisited[sourceVertexId]) {
    return false;
  }
  // if the same vertex is encountered when it is still in visiting status, then a cycle is found
  if (visiting[sourceVertexId]) {
    return true;
  }
  visiting[sourceVertexId] = true;
  const sourceVertex = graph.vertices[sourceVertexId];
  let node = sourceVertex.edges.dummyHead.nextNode;
  while (node) {
    const targetVertexId = node.data.targetVertex.id;
    // for undirected graph, we need to make sure edge is only used once
    if (!graph.isUndirected() || visitedEdges[targetVertexId] !== sourceVertexId) {
      visitedEdges[sourceVertexId] = targetVertexId;
      const result = _detectCycleFromSource(graph, targetVertexId, visiting, fullyVisited, visitedEdges);
      if (result) {
        return true;
      }
    }
    node = node.nextNode;
  }
  // all source's connected vertices are visited already
  visiting[sourceVertexId] = false;
  fullyVisited[sourceVertexId] = true;

  return false;
}
