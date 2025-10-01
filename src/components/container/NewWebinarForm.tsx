"use client"

import { Input } from "../shared/Input"
import { Button } from "../shared/Button"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner"
import { useEffect } from "react";



const newWebinarSchema = z.object({
    title: z.string().min(1, { message: "Required field." }),
    summary: z.string().min(1, { message: "Required field." }),
    datetime: z.date({ message: "ERrprrrrr" }).transform(val => new Date(val)).refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, {
        message: "Date must not be in the past."
    }),
    duration: z.number({ message: "Make sure to type a number." }).positive({ message: "The duration must be a positive number." }),
    language: z.string().min(1, { message: "Required field." }),
    speakers: z.array(z.number()).min(1, { message: "Must select at least 1 item." }),
    categories: z.array(z.number()).min(1, { message: "Must select at least 1 item." }),

})

type newWebinarProps = z.infer<typeof newWebinarSchema>

type Category = {
    id: number,
    description: string
}

type Speaker = {
    id: number,
    name: string
}


export const NewWebinarForm = ({ categories, speakers }: { categories: Category[] | null, speakers: Speaker[] | null }) => {

    const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset, setValue, getValues, watch } = useForm<newWebinarProps>({
        resolver: zodResolver(newWebinarSchema),
        defaultValues: {
            title: "",
            summary: "",
            datetime: new Date(),
            duration: 0,
            language: "",
            categories: [],
            speakers: []
        }
    })

    const watchedSpeakers = watch("speakers")
    const watchedCategories = watch("categories")

    const onSubmit = async (data: newWebinarProps) => {

        try {
            await api.post(`/webinar`, data)
            toast.success("New webinar added successfully!")
        } catch (error) {
            toast.error(handleApiError.message(error))
        }
    }


    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])

    return (
        <div className="p-8 border-[1px] border-gray-200 rounded-md">
            <h1 className="text-2xl font-bold mb-2 text-left mx-auto leading-none">New Webinar</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input id="title" type="text" label="Title" placeholder="Title" register={register("title")} error={errors.title?.message} />
                <div className="flex flex-col items-start justify-center mb-4"><label htmlFor="summary">Summary</label>
                    <textarea {...register("summary")} className={`border-1 border-gray-200 rounded-md w-full py-2 px-4 focus:outline-none focus:border-gray-950 `} name="summary" id="" />
                    {errors.summary?.message && <p className="text-red-400 font-light text-left text-sm">{errors.summary?.message}</p>}
                </div>

                <div className="flex items-end justify-start gap-2">
                    <div className="flex flex-col items-start justify-center mb-4">
                        <label htmlFor="datetime" className="mb-1">
                            Datetime
                        </label>
                        <input
                            type="datetime-local"
                            lang="en-US"
                            id="datetime"
                            {...register("datetime", { valueAsDate: true })}
                            className="w-full px-4 py-2 border-[1px] border-gray-200 rounded-md focus:outline-none focus:border-gray-950 transition-all duration-200 hover:border-gray-400"
                        />
                        {errors.datetime?.message && <p className="text-red-400 font-light text-left text-sm">{errors.datetime?.message}</p>}
                    </div>
                    <Input id="duration" type="number" label="Duration" placeholder="In minutes" register={register("duration", { valueAsNumber: true })} error={errors.duration?.message} />
                    <Input type="text" id="language" label="Language" placeholder="English" register={register("language")} error={errors.language?.message} />

                </div>

                <div className="mb-4">
                    <p className="capitalize text-sm mb-1">Categories</p>
                    <div className="flex items-center justify-start gap-4">
                        {categories && categories?.length > 0 && categories.map(item => (<div key={item.id} className="flex items-center justify-start gap-1">
                            <input type="checkbox" name="categories" id={item.description}
                                onChange={(e) => {
                                    const isChecked = e.target.checked
                                    const selectedCategories = getValues("categories") ?? []
                                    if (isChecked) setValue("categories", [...selectedCategories, item.id])
                                    else setValue("categories", selectedCategories.filter(i => i !== item.id))

                                }}
                                checked={watchedCategories ? watchedCategories.some(i => i === item.id) : false}
                            />
                            <label className="font-light text-sm capitalize" htmlFor={item.description}>{item.description}</label>
                        </div>))}
                        {errors.categories?.message && <p className="text-red-400 font-light text-left text-sm">{errors.categories?.message}</p>}
                    </div>



                </div>

                <div className="mb-4">
                    <p className="capitalize text-sm mb-1">Speakers</p>
                    <div className="flex items-center justify-start gap-4">
                        {speakers && speakers?.length > 0 && speakers.map(item => (<div key={item.id} className="flex items-center justify-start gap-1">
                            <input type="checkbox" name="categories" id={item.name}
                                onChange={(e) => {
                                    const isChecked = e.target.checked
                                    const selectedSpeakers = getValues("speakers") ?? []
                                    if (isChecked) setValue("speakers", [...selectedSpeakers, item.id])
                                    else setValue("speakers", selectedSpeakers.filter(i => i !== item.id))

                                }}
                                checked={watchedSpeakers ? watchedSpeakers.some(i => i === item.id) : false}

                            />
                            <label className="font-light text-sm capitalize" htmlFor={item.name}>{item.name}</label>
                        </div>))}
                        {errors.speakers?.message && <p className="text-red-400 font-light text-left text-sm">{errors.speakers?.message}</p>}
                    </div>



                </div>


                <Button type="submit" title="Add" />
            </form>
        </div>

    )
}