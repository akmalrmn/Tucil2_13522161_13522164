export interface point {
    x: number;
    y: number;
}
export interface nbezierprops {
    points: point[];
    iterate : number;
}

export const BezierNPoints = ({points, iterate} : nbezierprops) => {
    // buat cacah point bisa pake ini
    points.forEach(point => {
        
    })

}
