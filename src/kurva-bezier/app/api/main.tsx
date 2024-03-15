export interface Point {
  x: number;
  y: number;
}

export interface Props {
  points: Point[];
  n: number;
}

export const drawBezierCurve = ({ points, n }: Props): Point[] => {
  let temPoints = [...points];
  const resPoints: Point[] = [];

  for (let i = 0; i < n; i++) {
    let newPoints: Point[] = [];
    for (let j = 0; j < temPoints.length - 1; j++) {
      const mid = midPoint(
        temPoints[j].x,
        temPoints[j].y,
        temPoints[j + 1].x,
        temPoints[j + 1].y
      );
      newPoints.push(temPoints[j], mid);
    }
    newPoints.push(temPoints[temPoints.length - 1]);
    temPoints = newPoints;
  }

  resPoints.unshift(temPoints[0]);
  resPoints.push(temPoints[temPoints.length - 1]);

  return resPoints;
}

function midPoint(x0: number, y0: number, x1: number, y1: number): Point {
  const x = (x0 + x1) / 2;
  const y = (y0 + y1) / 2;
  return { x, y };
}

export const drawBezierCurveBruteForce = ({ points, n }: Props): Point[] => {
  const resPoints: Point[] = [];
  const numPoints = points.length - 1;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    let x = 0;
    let y = 0;

    for (let j = 0; j <= n; j++) {
      const blend = binomialCoefficient(n, j) * Math.pow(1 - t, n - j) * Math.pow(t, j);
      x += blend * points[j].x;
      y += blend * points[j].y;
    }

    resPoints.push({ x, y });
  }

  return resPoints;
}

function binomialCoefficient(n: number, k: number): number {
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - i + 1) / i;
  }
  return result;
}

const points: Point[] = [
  { x: 5, y: 35 },
  { x: 20, y: 45 },
  { x: 35, y: 35 },
  { x: 45, y: 25 },
];

const n = 4;

const divideAndConquerPoints = drawBezierCurve({ points, n });
console.log("Divide and Conquer Points:", divideAndConquerPoints);
const bruteForcePoints = drawBezierCurveBruteForce({ points, n });
console.log("Brute Force Points:", bruteForcePoints);