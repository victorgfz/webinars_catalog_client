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

const categoriesSchema = z.object({
    description: z.string().min(1, { message: "Required field" }),
})

type categoriesProps = z.infer<typeof categoriesSchema>


export const CategoriesForm = () => {

    const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, reset } = useForm<categoriesProps>({
        resolver: zodResolver(categoriesSchema),
        defaultValues: {
            description: ""
        }
    })


    const onSubmit = async (data: categoriesProps) => {
        try {
            await api.post(`/filter/categories`, data)
            toast.success("New category added successfully!")
        } catch (error) {
            toast.error(handleApiError.message(error))
        }
    }

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])

    return (
        <div className="p-8 border-[1px] border-gray-200 rounded-md flex-1">
            <h1 className="text-2xl font-bold mb-2 text-left mx-auto leading-none">New Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input id="description" type="text" label="Description" placeholder="Category" register={register("description")} error={errors.description?.message} />
                <Button type="submit" title="Add" />
            </form>
        </div>

    )
}