import { SinglyLinkedList } from '../linked-list/singly-linked-list';

export enum GraphEdgeDirection {
  Undirected = 'undirected',
  Directed = 'directed',
}

export class Vertex {
  /**
   * identifer for the vertex, vertex can be represented by string, e.g.
   * A,B,C... but each vertex should have its numeric identifier: usually
   * it's the index of the vertex, e.g. 0,1,2...
   */
  id: number;

  /** label of the vertex */
  label: string;

  /** adjacent edges started from this vertex represented by a linked list */
  edges: SinglyLinkedList<Edge>;

  constructor(id: number, label?: string) {
    this.id = id;
    this.label = label ?? id.toString();
    this.edges = new SinglyLinkedList<Edge>();
  }
}

export class Edge {
  /** for weighted graph, the weight is stored on the edge */
  weight: number;

  /** source vertex */
  sourceVertex: Vertex;

  /** target vertex */
  targetVertex: Vertex;

  constructor(sourceVertex: Vertex, targetVertex: Vertex, weight = 0) {
    this.sourceVertex = sourceVertex;
    this.targetVertex = targetVertex;
    this.weight = weight;
  }
}

/**
 * Graph implementation with Adjacency List.
 */
export class Graph {
  /** indicate the graphql is undirected or directed */
  private _edgeDirection: GraphEdgeDirection;

  /** number of vertices */
  numberOfVertices: number;

  /**
   * vertices in the graph, the index of the array is the id of
   * the vertex
   */
  vertices: Vertex[] = [];

  constructor(edgeDirection: GraphEdgeDirection, numberOfVertices: number) {
    this._edgeDirection = edgeDirection;
    this.numberOfVertices = numberOfVertices;
    for (let vertexId = 0; vertexId < numberOfVertices; vertexId++) {
      this.vertices.push(new Vertex(vertexId));
    }
  }

  isUndirected(): boolean {
    return this._edgeDirection === GraphEdgeDirection.Undirected;
  }

  addEdge(sourceVertexId: number, targetVertexId: number, weight = 0): void {
    const sourceVertex = this.vertices[sourceVertexId];
    const targetVertex = this.vertices[targetVertexId];
    const edge = new Edge(sourceVertex, targetVertex, weight);
    sourceVertex.edges.insertAtTail(edge);
    if (this.isUndirected()) {
      const edge1 = new Edge(targetVertex, sourceVertex, weight);
      targetVertex.edges.insertAtTail(edge1);
    }
  }

  toString(): string {
    const stringArr: string[] = [];
    for (let vertexId = 0; vertexId < this.numberOfVertices; vertexId++) {
      stringArr.push(`|${vertexId}|->`);
      if (this.vertices[vertexId].edges.isEmpty()) {
        stringArr.push('null,');
      } else {
        let node = this.vertices[vertexId].edges.dummyHead.nextNode;
        while (node) {
          stringArr.push(`[${node.data.targetVertex.id}]->`);
          if (!node.nextNode) {
            stringArr.push('null,');
          }
          node = node.nextNode;
        }
      }
    }
    return stringArr.join('');
  }
}
