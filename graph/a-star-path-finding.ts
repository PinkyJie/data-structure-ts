import { BinaryHeap } from '../binary-heap/binary-heap';
import { Graph, Vertex } from './graph';

/**
 * A* path finding is another algorithm to find the path from one vertex to another in
 * a graph, it's an improvement based on "Dijkstra shortest path". The downside for
 * Dijkstra is that it always choose the shortest "distance" in the heap, but it doesn't
 * consider the direction to the target vertex, so in some cases, the shortest one chosen
 * at the beginning might be the counter direction of the target vertex, it will take some
 * time for the algorithm to go back its correct direction. Check the following example:
 *
 *        ...
 *         |
 *         C
 *       1 |
 *   A --- B --- D --- E
 *            3
 *
 * If we are trying to find the path from A to E, then at the vertex B, path B->C will be
 * considered first cause that path is shorter, but we can clearly see that it's on the
 * wrong direction.
 *
 * The improvement A* tries to achieve is to introduce another factor for each vertex
 * `h` (heuristic distance to the target vertex), and we call the factor we used for
 * Dijkstra as `g` (distance from source to this vertex), for each vertex, we consider
 * both `g` and `h` together (cost `f = g + h`) to choose which vertex to proceed.
 * If we can make sure `h` reflects the real distance, then this approach will be faster
 * than Dijkstra. Take the above example, if we make `h(D) < h(C)`, then B->D will be chosen.
 *
 * Note: if `h` is an overestimation, then the final path might not be the shortest one.
 * So be sure the `h` is either accurate or underestimation.
 *
 * Time: O((V+E)log(V))
 *
 * Note: the implementation is pretty similar as Dijkstra, the only difference is in the min
 * heap we use `cost` ( = `g + h` as explained above) to calculate the priority.
 */
export function aStarPathFinding(
  graph: Graph,
  sourceVertexId: number,
  targetVertexId: number,
  heuristicValues: number[],
): {
  shortestPath: string[];
  shortestDistance: number;
} {
  const sourceVertex = graph.vertices[sourceVertexId];
  const goalVertex = graph.vertices[targetVertexId];

  const distanceMap: {
    [targetVertexLabel: string]: number;
  } = {
    [sourceVertex.label]: 0,
  };
  const parentMap: {
    [targetVertexLabel: string]: Vertex;
  } = {
    [sourceVertex.label]: null,
  };

  const minHeap = new BinaryHeap<{
    vertex: Vertex;
    distance: number;
    cost: number;
  }>(
    /** vertex which has lower cost has higher priority */
    (a, b) => a.cost < b.cost,
    (data) => data.vertex.label,
  );

  // construct heap: O(Vlog(V))
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    minHeap.push({
      vertex: graph.vertices[vertexId],
      distance: vertexId === sourceVertexId ? 0 : Infinity,
      cost: vertexId === sourceVertexId ? 0 + heuristicValues[sourceVertexId] : Infinity,
    });
  }

  while (!minHeap.isEmpty()) {
    const data = minHeap.peek();
    if (data.vertex.id === goalVertex.id) {
      break;
    }
    minHeap.delete(data); // O(log(V))
    const { vertex } = data;
    let node = vertex.edges.dummyHead.nextNode;
    while (node) {
      const { targetVertex, weight } = node.data;
      const targetVertexInHeap = minHeap.find(targetVertex.label); // O(1)
      const newDistance = distanceMap[vertex.label] + weight;
      const newCost = distanceMap[vertex.label] + weight + heuristicValues[targetVertex.id];
      if (targetVertexInHeap && targetVertexInHeap.cost > newCost) {
        parentMap[targetVertex.label] = vertex;
        distanceMap[targetVertex.label] = newDistance;
        targetVertexInHeap.distance = newDistance;
        targetVertexInHeap.cost = newCost;
        const targetVertexIndexInHeap = minHeap.findIndex(targetVertexInHeap); // O(1)
        minHeap._heapifyUp(targetVertexIndexInHeap); // O(log(V))
      }
      node = node.nextNode;
    }
  }

  const shortestPath = [goalVertex.label];
  let parentVertex = parentMap[goalVertex.label];
  while (parentVertex) {
    shortestPath.push(parentVertex.label);
    parentVertex = parentMap[parentVertex.label];
  }

  return {
    shortestPath: shortestPath.reverse(),
    shortestDistance: distanceMap[goalVertex.label],
  };
}
