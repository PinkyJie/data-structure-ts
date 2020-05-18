import { SinglyLinkedList } from '../linked-list/singly-linked-list';

export enum GraphEdgeDirection {
  Undirected = 'undirected',
  Directed = 'directed',
}

/**
 * Graph implementation with Adjacency List.
 */
export class Graph {
  /** indicate the graphql is undirected or directed */
  private edgeDirection: GraphEdgeDirection;
  /** number of vertices */
  numberOfVertices: number;

  /**
   * denote vertices from the graph as 0~n, every items in `edges` is a linked list
   * starts with the vertex i and contains all the edges with vertex i as source.
   */
  edges: SinglyLinkedList<number>[] = [];

  constructor(edgeDirection: GraphEdgeDirection, numberOfVertices: number) {
    this.edgeDirection = edgeDirection;
    this.numberOfVertices = numberOfVertices;
    for (let i = 0; i < numberOfVertices; i++) {
      this.edges.push(new SinglyLinkedList<number>());
    }
  }

  isUndirected(): boolean {
    return this.edgeDirection === GraphEdgeDirection.Undirected;
  }

  addEdge(source: number, destination: number): void {
    this.edges[source].insertAtTail(destination);
    if (this.isUndirected()) {
      this.edges[destination].insertAtTail(source);
    }
  }

  toString(): string {
    const stringArr: string[] = [];
    for (let i = 0; i < this.numberOfVertices; i++) {
      stringArr.push(`|${i}|->`);
      if (this.edges[i].isEmpty()) {
        stringArr.push('null,');
      } else {
        let node = this.edges[i].dummyHead.nextNode;
        while (node) {
          stringArr.push(`[${node.data}]->`);
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
