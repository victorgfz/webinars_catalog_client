"use client"

import { Input } from "../shared/Input"
import { Button } from "../shared/Button"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner"
import { Dispatch, SetStateAction } from "react";

const enrollmentSchema = z.object({
    name: z.string().min(3, { message: "Name must contain at least 3 letters!" }),
    email: z.email({ message: "Invalid email format!" }),
    linkedin: z.url({ message: "Invalid URL format!" }).refine((val) => val.includes("linkedin.com/in/"), { error: "Make sure to type a valid Linkedin URL." })
})

type enrollmentProps = z.infer<typeof enrollmentSchema>


export const EnrollmentForm = ({ webinarId, setReload }: { webinarId: number, setReload: Dispatch<SetStateAction<boolean>> }) => {

    const { handleSubmit, register, formState: { errors, } } = useForm<enrollmentProps>({
        resolver: zodResolver(enrollmentSchema),
    })


    const onSubmit = async (data: enrollmentProps) => {
        try {
            await api.post(`/webinar/${webinarId}/enrollment`, data)

            toast.success("Enrollment registered successfully!")
            setReload(true)
        } catch (error) {
            toast.error(handleApiError.message(error))
        }
    }

    return (
        <div className="p-8 border-[1px] border-gray-200 rounded-md">
            <h1 className="text-4xl font-bold mb-2 text-center max-w-2/3 mx-auto leading-none">Sign up and guarantee your spot</h1>
            <p className="text-sm font-light mb-4 text-center">Limited to one registration per email and one per LinkedIn account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input id="name" type="text" label="Name" placeholder="Your name" register={register("name")} error={errors.name?.message} />
                <Input id="email" type="text" label="Email" placeholder="example@gmail.com" register={register("email")} error={errors.email?.message} />
                <Input id="linkedin" type="text" label="Linkedin Profile" placeholder="https://linkedin.com/in/example" register={register("linkedin")} error={errors.linkedin?.message} />

                <Button type="submit" title="Submit" />

            </form>
        </div>

    )
}