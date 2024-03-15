'use client';

import { useRef, useEffect } from 'react';
import { Slider } from './ui/slider';

export interface pointProps {
    x: number;
    y: number;
}

export interface CanvasProps {
    point1: pointProps;
    point2: pointProps;
    point3: pointProps;
}

export function Canvas({point1, point2, point3}: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas?.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (!point1 || !point2 || !point3) return;
        console.log(point1, point2, point3)

        const points = [
            { x: point1.x*100, y: point1.y*100},
            { x: point2.x*100, y: point2.y*100},
            { x: point3.x*100, y: point3.y*100},
        ];

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length ; i++) {
            const cp = points[i];

            context.lineTo(cp.x, cp.y);
        }

        context.strokeStyle = 'white';
        context.stroke();
    }, [])


    return (
        <>
            <canvas ref={canvasRef} width={500} height={500} className='h-[95%] bg-[#1d1d1d] rounded-md ' />
            <Slider className='mt-3 w-[95%]'/>
        </>
    );
}