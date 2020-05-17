import { Graph } from './graph';

/**
 * Breath first search
 *
 * Time: O(V + E) - V the number of vertices, E the number of edges
 */
export function bfsGraphTraversal(graph: Graph, doVisit: (vertex: number) => void): void {
  const visited = Array.from({ length: graph.numberOfVertices }, () => false);

  const queue: number[] = [];
  // for loop here in case some vertices are not connected with others
  for (let i = 0; i < graph.numberOfVertices; i++) {
    queue.push(i);
    while (queue.length > 0) {
      const vertex = queue.shift();
      if (visited[vertex]) {
        continue;
      }
      visited[vertex] = true;
      doVisit(vertex);
      let node = graph.edges[vertex].dummyHead.nextNode;
      while (node) {
        queue.push(node.data);
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
export function dfsGraphTraversal(graph: Graph, doVisit: (vertex: number) => void): void {
  const visited = Array.from({ length: graph.numberOfVertices }, () => false);

  // for loop here in case some vertices are not connected with others
  for (let i = 0; i < graph.numberOfVertices; i++) {
    _dfs(graph, i, doVisit, visited);
  }
}

function _dfs(graph: Graph, source: number, visit: (vertex: number) => void, visited: boolean[]): void {
  if (visited[source]) {
    return;
  }
  visited[source] = true;
  visit(source);
  let node = graph.edges[source].dummyHead.nextNode;
  while (node) {
    _dfs(graph, node.data, visit, visited);
    node = node.nextNode;
  }
}
