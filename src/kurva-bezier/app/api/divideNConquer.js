// Midpoint function
function midPoint(x0, y0, x1, y1) {
  const x = (x0 + x1) / 2;
  const y = (y0 + y1) / 2;
  return { x, y };
}

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
function drawBezierCurve(x0, y0, x1, y1, x2, y2, n) {
  const points = [];
  points.push({ x: x0, y: y0 });

  let P0 = { x: x0, y: y0 };
  let P1 = { x: x1, y: y1 };
  let P2 = { x: x2, y: y2 };

  for (let i = 0; i < n; i++) {
    const Q0 = midPoint(P0.x, P0.y, P1.x, P1.y);
    const Q1 = midPoint(P1.x, P1.y, P2.x, P2.y);
    const R = midPoint(Q0.x, Q0.y, Q1.x, Q1.y);
    points.push(R);

    if (i < n - 1) {
      const S0 = midPoint(P0.x, P0.y, Q0.x, Q0.y);
      const S1 = midPoint(Q0.x, Q0.y, R.x, R.y);
      const S2 = midPoint(R.x, R.y, Q1.x, Q1.y);
      const S3 = midPoint(Q1.x, Q1.y, P2.x, P2.y);

      const T0 = midPoint(S0.x, S0.y, S1.x, S1.y);
      const T1 = midPoint(S2.x, S2.y, S3.x, S3.y);

      P0 = S0;
      P1 = T0;
      P2 = T1;
    }
  }

  points.push({ x: x2, y: y2 });
  return points;
}

// Example usage
const x0 = 50, y0 = 350; // Initial position
const x1 = 200, y1 = 450; // Control point
const x2 = 350, y2 = 350; // Final position
const n = 2; // Number of iterations

// Divide and conquer
const divideAndConquerPoints = drawBezierCurve(x0, y0, x1, y1, x2, y2, n);
console.log('Divide and Conquer Points:', divideAndConquerPoints);

// Brute force
const bruteForcePoints = bruteForceDrawBezierCurve(x0, y0, x1, y1, x2, y2, n);
console.log('Brute Force Points:', bruteForcePoints);