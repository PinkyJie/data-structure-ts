import { BinaryHeap } from '../binary-heap/binary-heap';
import { Graph, Vertex } from './graph';

/**
 * Dijkstra's shortest path O((V+E)log(V)) - E: number of edges V: number of vertices
 *    - single source shortest path algorithm for graphs with non-negative
 * edge weights, given a graph and a source vertex, this algorithm will find
 * the shortest path from this source vertex to all other vertices
 *
 *           (4)
 *        B ----- C               calculate the shortest path from A to all
 *    (2)/         \(3)           remaining vertices
 *      A --------- F
 *      \    (4)   /
 *       \        /
 *     (5)\      /(2)
 *         \    /
 *          \  /
 *            D ------- E
 *                (1)
 */
export function findDijkstraShortestPath(
  graph: Graph,
  sourceVertexId: number,
): {
  /** distance from the source vertex to all other vertices */
  distanceMap: {
    [targetVertexLabel: string]: number;
  };
  /** vertex's parent vertex which is used to calculate that distance */
  parentMap: {
    [targetVertexLabel: string]: Vertex;
  };
} {
  const sourceVertex = graph.vertices[sourceVertexId];

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

  /**
   * Heap here is used to save the current distance from the source vertex
   * to the target vertices.
   *    a) by default we set the distance for source vertex itself to 0, and
   * set the distance for all the remaining vertices to Infinity because they
   * are unknown at the beginning
   *    b) remove the vertex which has the smallest distance from the heap,
   * mark it as the `current` vertex, put it in the `distanceMap`, visit all
   * its adjacent vertices, if the vertex is not in heap anymore, then ignore
   * (cause it's already visited and its distance is already calculated and
   * stored in `distanceMap`), if the vertex is in the heap and the distance
   * in the heap and is larger than the new distance (`current` vertex's distance
   * from source vertex [in `distanceMap`] + weight), then we need to update
   * the distance in the heap and update its parent vertex to the `current` vertex.
   *    c) repeat b) until heap is empty
   */
  const minHeap = new BinaryHeap<{
    vertex: Vertex;
    distance: number;
  }>(
    /** vertex which has lower distance has higher priority */
    (a, b) => a.distance < b.distance,
    /** use vertex's label as the identifer for the heap data */
    (data) => data.vertex.label,
  );

  // construct heap: O(Vlog(V))
  for (let vertexId = 0; vertexId < graph.numberOfVertices; vertexId++) {
    minHeap.push({
      vertex: graph.vertices[vertexId],
      distance: vertexId === sourceVertexId ? 0 : Infinity,
    });
  }

  while (!minHeap.isEmpty()) {
    const data = minHeap.peek();
    minHeap.delete(data); // O(log(V))
    const { vertex } = data;
    let node = vertex.edges.dummyHead.nextNode;
    while (node) {
      const { targetVertex, weight } = node.data;
      const targetVertexInHeap = minHeap.find(targetVertex.label); // O(1)
      const newDistance = distanceMap[vertex.label] + weight;
      if (targetVertexInHeap && targetVertexInHeap.distance > newDistance) {
        parentMap[targetVertex.label] = vertex;
        distanceMap[targetVertex.label] = newDistance;
        targetVertexInHeap.distance = newDistance;
        /**
         * re-balance the heap after updating the distance, why only `siftUp` is required?
         * Note the fact that here the distance update can only be decreased (because it
         * will be updated only when the distance get shorter), in a min heap, if we decrease
         * the value, it doesn't affect their children nodes (still smaller than children
         * nodes), that's why only comparing with parent (siftUp) is required here.
         */
        const targetVertexIndexInHeap = minHeap.findIndex(targetVertexInHeap); // O(1)
        minHeap._heapifyUp(targetVertexIndexInHeap); // O(log(V))
      }
      node = node.nextNode;
    }
  }

  return {
    distanceMap,
    parentMap,
  };
}
