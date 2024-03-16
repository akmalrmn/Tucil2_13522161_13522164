export interface point {
    x: number;
    y: number;
}
export interface props {
    P0 : point;
    P1 : point;
    P2 : point;
    iterate : number;
}

export const Bezier3Points = ({P0, P1, P2, iterate} : props) => {
    if (iterate === 0) return [P0, P1, P2];
    
    const Q0 : point = middlePoint(P0, P1); // Left
    const Q1 : point = middlePoint(P1, P2); // right
    const R0 : point = middlePoint(Q0, Q1); // middle

    if (iterate === 1) return [P0, R0, P2];

    const leftCurve : point[] = Bezier3Points({P0, P1: Q0, P2: R0, iterate: iterate - 1});
    const rightCurve : point[] = Bezier3Points({P0: R0, P1: Q1, P2: P2, iterate: iterate - 1});

    return [...leftCurve, ...rightCurve];
}

function middlePoint(P0: point, P1: point) {
    return {
        x: (P0.x + P1.x) / 2,
        y: (P0.y + P1.y) / 2
    }
}