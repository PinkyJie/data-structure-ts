import { Graph, Vertex } from './graph';

/**
 * Breath first search
 *
 * Time: O(V + E) - V the number of vertices, E the number of edges
 */
export function bfsGraphTraversal(graph: Graph, doVisit: (vertex: Vertex) => void): void {
  const visited = new Array(graph.numberOfVertices).fill(false);

  const queue: number[] = [];
  // for loop here in case some vertices are not connected with others
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    queue.push(vertexId);
    while (queue.length > 0) {
      const vertexIdInQueue = queue.shift();
      if (visited[vertexIdInQueue]) {
        continue;
      }
      visited[vertexIdInQueue] = true;
      const vertex = graph.vertices[vertexIdInQueue];
      doVisit(vertex);
      let node = vertex.edges.dummyHead.nextNode;
      while (node) {
        queue.push(node.data.targetVertex.id);
        node = node.nextNode;
      }
    }
  }
}

/**
 * Depth first search
 *
 * Time: O(V + E) - V the number of vertices, E the number of edges
 */
export function dfsGraphTraversal(graph: Graph, doVisit: (vertex: Vertex) => void): void {
  const visited = new Array(graph.numberOfVertices).fill(false);

  // for loop here in case some vertices are not connected with others
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    _dfs(graph, vertexId, doVisit, visited);
  }
}

function _dfs(graph: Graph, sourceVertexId: number, doVisit: (vertex: Vertex) => void, visited: boolean[]): void {
  if (visited[sourceVertexId]) {
    return;
  }
  visited[sourceVertexId] = true;
  const sourceVertex = graph.vertices[sourceVertexId];
  doVisit(sourceVertex);
  let node = sourceVertex.edges.dummyHead.nextNode;
  while (node) {
    _dfs(graph, node.data.targetVertex.id, doVisit, visited);
    node = node.nextNode;
  }
}
