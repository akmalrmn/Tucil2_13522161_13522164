function midPoint(x0, y0, x1, y1) {
  const x = (x0 + x1) / 2;
  const y = (y0 + y1) / 2;
  return { x, y };
}

function drawBezierCurve(points, n) {
  const resPoints = [];
  let num = points.length;

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