"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
    useFormField
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    points: z.array(
        z.object({
            x: z.any(),
            y: z.any(),
        }))
    .min(3, "At least 3 points are required"),
    iteration: z.any(),
})

type formValues = z.infer<typeof formSchema>

export const NForm = () => {

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

    const onSubmit = (values: formValues) => {
        const result = formSchema.safeParse(values);
        if (!result.success) {
          console.error(result.error.errors);
        }

        console.log(values);
      }

    return (
      <div className="flex justify-center items-center h-full w-full">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 max-w-md space-y-5">
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative points my-5">
                {fields.map((_, index) => {
                  return(
                    <div key={index}>
                      <div className="mt-7 mb-2 text-xl font-bold">
                        Point {index+1}:
                      </div>
                      <div className="w-full flex flex-row gap-3">
                        <div className="flex gap-x-3">
                          <FormField
                            name={`points.${index}.x`}
                            control={form.control}
                            key={index}
                            render={({ field }) => (
                              <FormItem className="flex flex-row justify-center items-center gap-5">
                                <FormLabel className="h-full flex text-center justify-center items-center mt-[8px]">X:</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="X"
                                    type="number"
                                    className="flex items-center justify-center h-full w-full"
                                    {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.points?.message}</FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-x-3">
                          <FormField
                            name={`points.${index}.y`}
                            control={form.control}
                            key={index+1}
                            render={({ field }) => (
                              <FormItem className="flex flex-row justify-center items-center gap-5">
                                <FormLabel className="h-full flex text-center justify-center items-center mt-[8px]">Y:</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Y"
                                    type="number"
                                    className=""
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
                            className="mt-3 w-full"
                            {...field}
                          />
                      </FormControl>
                    </FormItem>  
                  )}
                />
              </div>
              <Button className="" type="submit">Draw!</Button>
            </div>
          </form>
        </Form>
      </div>
    )
}