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

const speakersSchema = z.object({
    name: z.string().min(1, { message: "Required field" }),
})

type speakersProps = z.infer<typeof speakersSchema>


export const SpeakersForm = () => {

    const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<speakersProps>({
        resolver: zodResolver(speakersSchema),
        defaultValues: {
            name: ""
        }
    })


    const onSubmit = async (data: speakersProps) => {
        try {
            await api.post(`/filter/speakers`, data)
            toast.success("New speaker added successfully!")
        } catch (error) {
            toast.error(handleApiError.message(error))
        }
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])

    return (
        <div className="p-8 border-[1px] border-gray-200 rounded-md flex-1">
            <h1 className="text-2xl font-bold mb-2 text-left mx-auto leading-none">New Speaker</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input id="name" type="text" label="Name" placeholder="Speaker" register={register("name")} error={errors.name?.message} />
                <Button type="submit" title="Add" />
            </form>
        </div>

    )
}