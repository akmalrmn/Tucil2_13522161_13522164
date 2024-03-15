'use client';

import { useState, useRef, useEffect } from 'react'
import { Slider } from './ui/slider';
import { Canvas, CanvasProps } from './Canvas'
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from './ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Input } from './ui/input'
import { Button } from './ui/button'
import MyResponsiveLine from './LineChart';
import { LineSvgProps } from '@nivo/line';

interface Props {}

export const MainCard = ({}) => {
    
    const [x0, setx0] = useState(0.0);
    const [x1, setx1] = useState(0.0);
    const [x2, setx2] = useState(0.0);
    const [y0, sety0] = useState(0.0);
    const [y1, sety1] = useState(0.0);
    const [y2, sety2] = useState(0.0);
    const [props, setProps] = useState<LineSvgProps>(
        {
            data: [
                {
                    id: '1',
                    color: 'hsl(0, 70%, 50%)',
                    data: [
                    ]
                }
            ]
        }
    );


    
    const firstClickHandler = () => {
        const datas : LineSvgProps = {
            data: [
                {
                    id: '1',
                    color: 'hsl(0, 70%, 50%)',
                    data: [
                        {x: x0, y: y0},
                        {x: x1, y: y1},
                        {x: x2, y: y2},
                    ]
                }
            ]
        }
        console.log('Button clicked');
        // Refresh the chart
        // the char is in myresponsiveline component
        setProps(datas);
    }

    return (
        <Card className='w-full h-full flex flex-col items-center justify-start bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-500 overflow-hidden'>
            <CardHeader className='w-[95%] h-[15%]'>
                <CardTitle className='font-extrabold text-4xl text-gray-100'>Tucil 2 STIMA</CardTitle>
                <CardDescription className='text-gray-200 ml-1'>Bezier Curve</CardDescription>
                <hr className='w-full border-2 rounded-full border-muted-foreground opacity-50' />
            </CardHeader>
            <CardContent className='flex items-center justify-center w-[95%] h-[85%]'>
                <div className='h-full aspect-square'>
                    <div className='h-[95%] aspect-square rounded-md bg-[#1d1d1d] flex items-center justify-center'>
                        {/* <canvas ref={canvasRef} width={w} height={h} className='max-h-full bg-[#ffffff]'/> */}
                        <MyResponsiveLine {...props} />
                    </div>
                    <Slider className='mt-3 w-[95%]'/>
                </div>
                <Tabs defaultValue="3-point" className="h-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="3-point">3-Point Bezier</TabsTrigger>
                        <TabsTrigger value="n-point">n-Point Bezier</TabsTrigger>
                    </TabsList>
                    <TabsContent value="3-point">
                        <Card>
                            <CardHeader>
                                <CardTitle className='font-extrabold text-2xl'>3-Point Bezier Curve</CardTitle>
                                <CardDescription>Set the control points for the bezier curve</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='flex flex-col w-full gap-5'>
                                        <div className='w-full font-bold text-lg'>
                                            Point 1:
                                            <div className='flex flex-row items-center justify-center w-full gap-5'>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> X : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? setx0(parseFloat(e.currentTarget.value)) : setx0(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> Y : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? sety0(parseFloat(e.currentTarget.value)) : sety0(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full font-bold text-lg'>
                                            Point 2:
                                            <div className='flex flex-row items-center justify-center w-full gap-5'>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> X : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? setx1(parseFloat(e.currentTarget.value)) : setx1(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> Y : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? sety1(parseFloat(e.currentTarget.value)) : sety1(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full font-bold text-lg'>
                                            Point 3:
                                            <div className='flex flex-row items-center justify-center w-full gap-5'>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> X : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? setx2(parseFloat(e.currentTarget.value)) : setx2(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> Y : </h1>
                                                    <Input onChange={(e) => {e.currentTarget.value ? sety2(parseFloat(e.currentTarget.value)) : sety2(0)}} defaultValue={0} type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex flex-row items-center justify-center w-full gap-5'>
                                                <div className='w-full flex flex-row items-center justify-between text-bold'>
                                                    <h1 className='ml-2 font-semibold text-md'> Iterasi : </h1>
                                                    <Input type='number' placeholder='0' className='w-[85%]'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={firstClickHandler} className='w-full mt-5'>Draw Bezier Curve</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="n-point">

                    </TabsContent>
                </Tabs>
                
            </CardContent>
        </Card>
    ) 
}
