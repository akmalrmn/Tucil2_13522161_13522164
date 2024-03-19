'use client';

import { useState, useEffect, useCallback } from 'react'
import { Slider } from './ui/slider';
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent 
} from './ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger 
} from './ui/tooltip';
import { Input } from './ui/input'
import { Button } from './ui/button'
import MyResponsiveLine from './LineChart';
import { LineSvgProps } from '@nivo/line';
import { ScrollArea } from './ui/scroll-area';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from './ui/use-toast';
import { drawBezierCurve, drawBezierCurveBruteForce, nBezierProps, Point } from '@/app/api/main';

const formSchema = z.object({
    points: z.array(
        z.object({
            x: z.any(),
            y: z.any(),
        })),
    iteration: z.any(),
})

type formValues = z.infer<typeof formSchema>



export const MainCard = () => {

  // State Declaration
    const { toast } = useToast();
    const [points, setPoints] = useState<Point[]>([]);
    const [method, setMethod] = useState<string>('dnc');
    const [iteration, setIteration] = useState(0);
    const [nowIterate, setNowIterate] = useState<number>(0);
    const [timeExecution, setTimeExecution] = useState<number>(0);
    const [props, setProps] = useState<LineSvgProps>(
        {
            data: [
                {
                    id: '',
                    color: '',
                    data: [
                    ]
                }
            ]
        }
    );


    // Form Declaration
    const form = useForm<formValues>({
      resolver: zodResolver(formSchema),
      mode: "all",
      defaultValues: {
          points: [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 0, y: 0 },
          ],
          iteration: 0,
      },
    });

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "points",
    });


    // Function Declaration
    const firstClickHandler = useCallback(() => {
      const newBezierProps : nBezierProps = {
          points: points,
          iterate : nowIterate
      }
  
      let ResultPointss : Point[];
      let startTime: number;
      let endTime: number;
  
      if (method === 'dnc') {
        startTime = performance.now();
        const {ResultPoints} = drawBezierCurve(newBezierProps);
        endTime = performance.now();
        ResultPointss = ResultPoints;
      } else {
        startTime = performance.now();
        const {ResultPoints} = drawBezierCurveBruteForce(newBezierProps);
        endTime = performance.now();
        ResultPointss = ResultPoints;
      }
  
      const executionTime = endTime - startTime;
      setTimeExecution(parseFloat(executionTime.toFixed(3)));
  
      const datas : LineSvgProps = {
          data: [
              {
                  id: 'point',
                  data: points
              },
              {
                  id: 'bezier',
                  data: ResultPointss
              },
  
          ]
      }
      setProps(datas);
  }, [method, points, nowIterate])

    const changeIteration = (iter : number) => {
        setIteration(iter);
        setNowIterate(0);
    }

    useEffect(() => {
        firstClickHandler();
    }, [firstClickHandler])
    
    const onSubmit = (values: formValues) => {
      if (values.iteration < 0) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Iteration must be greater than 0.",
        })
        return;
      }

      if (values.points.length < 3) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "At least 3 points are required to draw a bezier curve.",
        })
        return;
      }

      changeIteration(parseInt(values.iteration));

      const tempPoints = values.points.map((point) => {
        return {
          x: parseFloat(point.x),
          y: parseFloat(point.y),
        }
      })

      setPoints(tempPoints);

      firstClickHandler();
    }


    return (
      <Card className='w-full h-fit flex flex-col items-center justify-start bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-500 overflow-hidden'>
        <CardHeader className='w-[95%] h-[15%]'>
          <CardTitle className='font-extrabold text-4xl text-gray-100'>Tucil 2 STIMA</CardTitle>
          <CardDescription className='text-gray-200 ml-1'>Bezier Curve</CardDescription>
          <hr className='w-full border-2 rounded-full border-muted-foreground opacity-50' />
        </CardHeader>
        <CardContent className='flex items-center justify-center w-[95%] h-[85%] gap-5'>


          {/* CANVAS */}
          <div className='w-[45%] aspect-square flex-col justify-center items-center'>
            <div className='h-full rounded-md bg-[#1d1d1d] flex items-center justify-center'>
                <MyResponsiveLine {...props} />
            </div>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <Slider
                  className='mt-3 w-full' 
                  min={0} 
                  max={iteration} 
                  defaultValue={[0]}
                  value = {[nowIterate]}
                  onValueChange={(value) => setNowIterate(value[0])}
                />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className='select-none'    
              >
                <p>{nowIterate}</p>
              </TooltipContent>
            </Tooltip>
          </div>


          {/* TABS */}
          <Tabs defaultValue="dnc" onValueChange={(value) => setMethod(value)} className="h-full w-[45%]">

            {/* LIST TABS */}
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dnc">Divide & Conquer</TabsTrigger>
                <TabsTrigger value="bf">BruteForce</TabsTrigger>
            </TabsList>

            {/* TABS CONTENT */}
            <TabsContent value="dnc">
              <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='font-extrabold text-2xl'>n-Point Bezier Curve</CardTitle>
                    <CardDescription>Divide & Conquer</CardDescription>
                </CardHeader>
                <CardContent className='w-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col w-full gap-5'>
                      <div className="flex justify-center items-center h-full w-full">
                        <Form {...form}>
                          <form
                            action=""
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex-1 w-full space-y-5"
                          >
                            <div className="relative flex flex-col items-center justify-center">
                                  <ScrollArea
                                    scrollHideDelay={0}
                                    className='w-full h-[250px]'
                                  >
                                    <div className="relative points my-5 mx-3">
                                      {fields.map((_, index) => {
                                        return(
                                          <div key={index}>
                                            <div className="mt-7 mb-2 text-xl text-start font-bold">
                                              Point {index+1}:
                                            </div>
                                            <div className="w-full flex flex-row gap-3">
                                              <div className="flex gap-x-3 w-[45%]">
                                                <FormField
                                                  name={`points.${index}.x`}
                                                  control={form.control}
                                                  key={index}
                                                  render={({ field }) => (
                                                    <FormItem className="flex flex-row justify-center items-center gap-5">
                                                      <FormLabel className="h-full flex text-center font-semibold justify-center items-center mt-[8px]">X:</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          placeholder="X"
                                                          type="number"
                                                          defaultValue={0}
                                                          className="flex items-center justify-center w-full"
                                                          {...field} />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                              <div className="flex gap-x-3 w-[45%]">
                                                <FormField
                                                  name={`points.${index}.y`}
                                                  control={form.control}
                                                  key={index+1}
                                                  render={({ field }) => (
                                                    <FormItem className="flex flex-row justify-center items-center gap-5">
                                                      <FormLabel className="h-full flex text-center font-semibold justify-center items-center mt-[8px]">Y:</FormLabel>
                                                      <FormControl>
                                                        <Input 
                                                          placeholder="Y"
                                                          type="number"
                                                          defaultValue={0}
                                                          className="flex items-center justify-center w-full"
                                                          {...field} />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                              <Button
                                                type="button"
                                                className="mt-[8px] opacity-100 hover:opacity-70"
                                                onClick={() => remove(index)}
                                              >
                                                -
                                              </Button>
                                            </div>
                                          </div>
                                        )
                                      })}
                                      <Button 
                                        className="w-full bg-transparent border-2 border-black border-dashed text-black hover:bg-black hover:text-white mt-5"
                                        onClick={() => append({ x: 0, y: 0 })}
                                      >
                                        Add Point
                                      </Button>
                                      <FormMessage className="  ">{form.formState.errors.points?.message}</FormMessage>
                                    </div>
                                  </ScrollArea>
                              <div className="relative iteration my-5 w-full">
                                <FormField
                                  name="iteration"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel className="text-xl font-bold">Iteration:</FormLabel>
                                      <FormControl>
                                          <Input 
                                            placeholder="Number of iteration"
                                            type="number"
                                            defaultValue={0}
                                            className="mt-3 w-full"
                                            {...field}
                                            // onChange={(e) => {e.currentTarget.value ? changeIteration(parseInt(e.currentTarget.value)) : changeIteration(0)}}
                                          />
                                      </FormControl>
                                    </FormItem>  
                                  )}
                                />
                              </div>
                              <Button className="" type="submit">Draw Bezier Curve</Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='h-auto w-auto mt-5'>
                <CardContent className='h-auto w-auto p-5 flex items-center justify-center'>
                  <div className='flex flex-row gap-2 h-full w-full justify-center items-center select-none'>
                    <h1>Iterasi ke-</h1>
                    <div className='w-[30px] aspect-square bg-[#1d1d1d] rounded-sm flex justify-center items-center'>
                      <h1 className='text-white text-center font-bold'>{nowIterate}</h1>
                    </div>
                  </div>
                  <div className='flex flex-row gap-2 h-full w-full justify-center items-center select-none'>
                    <h1>Time Execution: </h1>
                    <div className='h-[30px] w-fit p-3 bg-[#1d1d1d] rounded-sm flex justify-center items-center'>
                      <h1 className='text-white text-center font-bold'>{timeExecution} ms</h1>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bf">
              <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='font-extrabold text-2xl'>n-Point Bezier Curve</CardTitle>
                    <CardDescription>Brute Force</CardDescription>
                </CardHeader>
                <CardContent className='w-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col w-full gap-5'>
                      <div className="flex justify-center items-center h-full w-full">
                        <Form {...form}>
                          <form
                            action=""
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex-1 w-full space-y-5"
                          >
                            <div className="relative flex flex-col items-center justify-center">
                                  <ScrollArea
                                    scrollHideDelay={0}
                                    className='w-full h-[250px]'
                                  >
                                    <div className="relative points my-5 mx-3">
                                      {fields.map((_, index) => {
                                        return(
                                          <div key={index}>
                                            <div className="mt-7 mb-2 text-xl text-start font-bold">
                                              Point {index+1}:
                                            </div>
                                            <div className="w-full flex flex-row gap-3">
                                              <div className="flex gap-x-3 w-[45%]">
                                                <FormField
                                                  name={`points.${index}.x`}
                                                  control={form.control}
                                                  key={index}
                                                  render={({ field }) => (
                                                    <FormItem className="flex flex-row justify-center items-center gap-5">
                                                      <FormLabel className="h-full flex text-center font-semibold justify-center items-center mt-[8px]">X:</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          placeholder="X"
                                                          type="number"
                                                          defaultValue={0}
                                                          className="flex items-center justify-center w-full"
                                                          {...field} />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                              <div className="flex gap-x-3 w-[45%]">
                                                <FormField
                                                  name={`points.${index}.y`}
                                                  control={form.control}
                                                  key={index+1}
                                                  render={({ field }) => (
                                                    <FormItem className="flex flex-row justify-center items-center gap-5">
                                                      <FormLabel className="h-full flex text-center font-semibold justify-center items-center mt-[8px]">Y:</FormLabel>
                                                      <FormControl>
                                                        <Input 
                                                          placeholder="Y"
                                                          type="number"
                                                          defaultValue={0}
                                                          className="flex items-center justify-center w-full"
                                                          {...field} />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                              <Button
                                                type="button"
                                                className="mt-[8px] opacity-100 hover:opacity-70"
                                                onClick={() => remove(index)}
                                              >
                                                -
                                              </Button>
                                            </div>
                                          </div>
                                        )
                                      })}
                                      <Button 
                                        className="w-full bg-transparent border-2 border-black border-dashed text-black hover:bg-black hover:text-white mt-5"
                                        onClick={() => append({ x: 0, y: 0 })}
                                      >
                                        Add Point
                                      </Button>
                                      <FormMessage className="  ">{form.formState.errors.points?.message}</FormMessage>
                                    </div>
                                  </ScrollArea>
                              <div className="relative iteration my-5 w-full">
                                <FormField
                                  name="iteration"
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel className="text-xl font-bold">Iteration:</FormLabel>
                                      <FormControl>
                                          <Input 
                                            placeholder="Number of iteration"
                                            type="number"
                                            defaultValue={0}
                                            className="mt-3 w-full"
                                            {...field}
                                            // onChange={(e) => {e.currentTarget.value ? changeIteration(parseInt(e.currentTarget.value)) : changeIteration(0)}}
                                          />
                                      </FormControl>
                                    </FormItem>  
                                  )}
                                />
                              </div>
                              <Button className="" type="submit">Draw Bezier Curve</Button>
                            </div>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='h-auto w-auto mt-5'>
                <CardContent className='h-auto w-auto p-5 flex items-center justify-center'>
                  <div className='flex flex-row gap-2 h-full w-full justify-center items-center select-none'>
                    <h1>Iterasi ke-</h1>
                    <div className='w-[30px] aspect-square bg-[#1d1d1d] rounded-sm flex justify-center items-center'>
                      <h1 className='text-white text-center font-bold'>{nowIterate}</h1>
                    </div>
                  </div>
                  <div className='flex flex-row gap-2 h-full w-full justify-center items-center select-none'>
                    <h1>Time Execution: </h1>
                    <div className='h-[30px] w-fit p-3 bg-[#1d1d1d] rounded-sm flex justify-center items-center'>
                      <h1 className='text-white text-center font-bold'>{timeExecution} ms</h1>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  ) 
}
