function midPoint(x0, y0, x1, y1) {
  const x = (x0 + x1) / 2;
  const y = (y0 + y1) / 2;
  return { x, y };
}

<<<<<<< HEAD
// Brute force implementation
function calculateBezierPoint(x0, y0, x1, y1, x2, y2, t) {
  const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
  const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
  return { x, y };
}

function bruteForceDrawBezierCurve(x0, y0, x1, y1, x2, y2, n) {
  const points = [];

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const { x, y } = calculateBezierPoint(x0, y0, x1, y1, x2, y2, t);
    points.push({ x, y });
  }

  return points;
}

// Divide and conquer implementation
export function drawBezierCurve(x0, y0, x1, y1, x2, y2, n) {
  const points = [];
  points.push({ x: x0, y: y0 });

  let P0 = { x: x0, y: y0 };
  let P1 = { x: x1, y: y1 };
  let P2 = { x: x2, y: y2 };
=======
function drawBezierCurve(points, n) {
  const resPoints = [];
  let num = points.length;
>>>>>>> f77e671ca55bc4787fb26907393d55f8375bb671

  for (let i = 0; i < n; i++) {
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
    for (let k = 0; k < num1 - 1; k++) {
      const mid = midPoint(
        temPoints[k].x,
        temPoints[k].y,
        temPoints[k + 1].x,
        temPoints[k + 1].y
      );
      if (i == n - 1) {
        resPoints.push(mid);
      } else {
        temPoints.splice(k + 1, 0, mid);
      }
    }

    temPoints.unshift(points[0]);
    temPoints.push(points[points.length - 1]);
    console.log("temPoints2:", temPoints);
    num = temPoints.length;
    points = temPoints;
  }

  // Prepend the first point and append the last point
  resPoints.unshift(points[0]);
  resPoints.push(points[points.length - 1]);

  return resPoints;
}

function drawBezierCurveBruteForce(points, numPoints) {
  const resPoints = [];
  const n = points.length - 1;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    let x = 0;
    let y = 0;

<<<<<<< HEAD
// Brute force
const bruteForcePoints = bruteForceDrawBezierCurve(x0, y0, x1, y1, x2, y2, n);
console.log('Brute Force Points:', bruteForcePoints);

=======
    for (let j = 0; j <= n; j++) {
      const blend = binomialCoefficient(n, j) * Math.pow(1 - t, n - j) * Math.pow(t, j);
      x += blend * points[j].x;
      y += blend * points[j].y;
    }

    resPoints.push({ x, y });
  }

  return resPoints;
}

function binomialCoefficient(n, k) {
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - i + 1) / i;
  }
  return result;
}

const points = [
  { x: 5, y: 35 },
  { x: 20, y: 45 },
  { x: 35, y: 35 },
  { x: 45, y: 25 },
];

const n = 4;

const divideAndConquerPoints = drawBezierCurve(points, n);
console.log("Divide and Conquer Points:", divideAndConquerPoints);
const bruteForcePoints = drawBezierCurveBruteForce(points, n);
console.log("Brute Force Points:", bruteForcePoints);
>>>>>>> f77e671ca55bc4787fb26907393d55f8375bb671
