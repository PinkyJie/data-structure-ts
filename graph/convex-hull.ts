/**
 * Convex hull question: given a group of vertices, find a shortest path which
 * can wrap all the vertices together, output the vertices on that path.
 *
 * Gift wrapping algorithm (Jarvis March):
 * 1. Find the left most vertex (whose x coordinate is the smallest)
 * 2. Make this left most vertex as source, find the next target within the remaining
 * vertices. Starting with vertex 0 as target candidate, draw a line between the left
 * most vertex and 0, for all remaining vertices, check if they are on the left side
 * of this line:
 *    a. if vertex k is on the same line, then compare current target with k, the one
 * who is further from the source should be the new target, put another one in an
 * Collinearity array (cause it should be included in the final result)
 *    b. if vertex k is on the left side of the line, then k should be the new target,
 * clear the previous Collinearity array
 * 3. After finding the target, mark it as the new source and repeat 2 until the next
 * target equals to the original left most vertex.
 *
 * Time: O(mn) - n is the number of all vertices, m is the number of vertices on the hull,
 * because for each vertex on the hull, we need to go through all other vertices.
 *
 * @param vertices a group of vertices represents by x,y coordinates
 */
export function convexHull(vertices: [number, number][]): [number, number][] {
  /** prevent duplicate vertex being added */
  const path = new Set<number>();

  const leftMostVertexIndex = _findLeftMostVertexIndex(vertices);
  path.add(leftMostVertexIndex);
  let sourceIndex = leftMostVertexIndex;
  let collinearity: number[] = [];
  while (true) {
    let targetIndex = 0;
    for (let i = 0; i < vertices.length; i++) {
      if (i === sourceIndex || i === targetIndex) {
        continue;
      }
      const vertex = vertices[i];
      const crossProduct = _crossProduct(vertices[sourceIndex], vertices[targetIndex], vertex);
      if (crossProduct === 0) {
        const distance1 = _distance(vertices[sourceIndex], vertices[targetIndex]);
        const distance2 = _distance(vertices[sourceIndex], vertex);
        if (distance2 > distance1) {
          collinearity.push(targetIndex);
          targetIndex = i;
        } else {
          collinearity.push(i);
        }
      } else if (crossProduct > 0) {
        targetIndex = i;
        collinearity = [];
      }
    }
    if (targetIndex === leftMostVertexIndex) {
      break;
    }
    collinearity.forEach((vertexIndex) => {
      path.add(vertexIndex);
    });
    path.add(targetIndex);
    // cleanup for next loop
    collinearity = [];
    sourceIndex = targetIndex;
  }

  return Array.from(path).map((index) => vertices[index]);
}

function _findLeftMostVertexIndex(vertexCoordinates: [number, number][]): number {
  let leftMostVertexIndex = 0;
  vertexCoordinates.forEach((vertex, index) => {
    if (vertex[0] < vertexCoordinates[leftMostVertexIndex][0]) {
      leftMostVertexIndex = index;
    }
  });
  return leftMostVertexIndex;
}

/**
 * Cross product of Vector AB and Vector AC, we can use this to check if vertexC's position
 * relative to line AB:
 *    - if the result < 0, vertexC is on the right side of the line
 *    - if the result = 0, vertexC is on the same line of AB
 *    - if the result > 0, vertexC is on the left side of the line
 *
 * https://www.youtube.com/watch?v=eu6i7WJeinw
 */
function _crossProduct(vertexA: [number, number], vertexB: [number, number], vertexC: [number, number]): number {
  const x1 = vertexB[0] - vertexA[0];
  const y1 = vertexB[1] - vertexA[1];
  const x2 = vertexC[0] - vertexA[0];
  const y2 = vertexC[1] - vertexA[1];
  return x1 * y2 - x2 * y1;
}

function _distance(vertexA: [number, number], vertexB: [number, number]): number {
  return (vertexB[0] - vertexA[0]) ** 2 - (vertexB[1] - vertexA[1]) ** 2;
}
