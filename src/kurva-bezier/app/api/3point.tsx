import { nBezierProps, Point } from "./main";

export const Bezier3Points = ({points, iterate} : nBezierProps) => {
    if (iterate === 0) return points;
    const P0 = points[0];
    const P1 = points[1];
    const P2 = points[2];
    
    const Q0 : Point = middlePoint(P0, P1); // Left
    const Q1 : Point = middlePoint(P1, P2); // right
    const R0 : Point = middlePoint(Q0, Q1); // middle

    if (iterate === 1) return [P0, R0, P2];

    const leftCurve : Point[] = Bezier3Points({points:[P0, Q0, R0], iterate: iterate - 1});
    const rightCurve : Point[] = Bezier3Points({points:[R0, Q1, P2], iterate: iterate - 1});

    return [...leftCurve, ...rightCurve];
}

function middlePoint(P0: Point, P1: Point) {
    return {
        x: (P0.x + P1.x) / 2,
        y: (P0.y + P1.y) / 2
    }
}