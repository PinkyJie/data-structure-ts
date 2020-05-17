import { convexHull } from './convex-hull';

describe('Convex hull:', () => {
  it('should return the path which can wrap all the vertices', () => {
    const coordinates: [number, number][] = [
      [0, 3],
      [2, 3],
      [2, 2],
      [1, 1],
      [2, 1],
      [3, 0],
      [0, 0],
      [3, 3],
    ];
    const path = convexHull(coordinates);

    expect(path).toEqual([
      [0, 3],
      [2, 3],
      [3, 3],
      [3, 0],
      [0, 0],
    ]);
  });
});
