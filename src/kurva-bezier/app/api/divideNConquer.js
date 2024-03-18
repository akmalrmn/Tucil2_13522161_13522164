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
    let temPoints2 = [];
    let k = 1;

    for (let j = 0; j < num - 1; j++) {
      const mid = midPoint(
        points[j].x,
        points[j].y,
        points[j + 1].x,
        points[j + 1].y
      );
      temPoints.push(mid);
      if (j > 0) {
        const mid2 = midPoint(
          temPoints[k - 1].x,
          temPoints[k - 1].y,
          temPoints[k].x,
          temPoints[k].y
        );
        if (i < n - 1) {
          temPoints2.push(temPoints[k - 1]);
          temPoints2.push(mid2);
          if (num - 2 == k) {
            temPoints2.push(temPoints[k]);
          }
        } else {
          resPoints.push(mid2);
        }
        k++;
      }
    }
    temPoints2.unshift(points[0]);
    temPoints2.push(points[points.length - 1]);
    num = temPoints2.length;
    points = temPoints2;
  }

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
      const blend =
        binomialCoefficient(n, j) * Math.pow(1 - t, n - j) * Math.pow(t, j);
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
