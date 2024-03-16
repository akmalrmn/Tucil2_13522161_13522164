export interface Point {
  x: number;
  y: number;
}

export interface nBezierProps {
  points: Point[];
  iterate : number;
}

function midPoint(x0: number, y0: number, x1: number, y1: number): Point {
  const x = (x0 + x1) / 2;
  const y = (y0 + y1) / 2;
  return { x, y };
}

export const drawBezierCurve = ({ points, iterate }: nBezierProps): Point[] => {
  const resPoints: Point[] = [];
  let num = points.length;

  for (let i = 0; i < iterate; i++) {
    let temPoints = [];
    for (let j = 0; j < num - 1; j++) {
      const mid = midPoint(
        points[j].x,
        points[j].y,
        points[j + 1].x,
        points[j + 1].y
      );
      temPoints.push(mid);
      console.log("temPoints:", temPoints);
    }

    let num1 = temPoints.length;
    let temPoints1 = [...temPoints];
    let l = 1;
    for (let k = 0; k < num1 - 1; k++) {
      const mid = midPoint(
        temPoints[k].x,
        temPoints[k].y,
        temPoints[k + 1].x,
        temPoints[k + 1].y
      );
      if (i == iterate - 1) {
        resPoints.push(mid);
      } else {
        if (k + 1 != 1){
          l += 2;
        }
        temPoints1.splice(l, 0, mid);
      }
    }

    temPoints1.unshift(points[0]);
    temPoints1.push(points[points.length - 1]);
    console.log("temPoints2:", temPoints1);
    num = temPoints1.length;
    points = temPoints1;
  }

  // Prepend the first point and append the last point
  resPoints.unshift(points[0]);
  resPoints.push(points[points.length - 1]);

  return resPoints;
}

export const drawBezierCurveBruteForce = ({ points, iterate }: nBezierProps): Point[] => {
  const resPoints: Point[] = [];
  const numPoints = points.length - 1;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    let x = 0;
    let y = 0;

    for (let j = 0; j <= iterate; j++) {
      const blend =
        binomialCoefficient(iterate, j) * Math.pow(1 - t, iterate - j) * Math.pow(t, j);
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

