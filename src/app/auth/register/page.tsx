"use client"

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/services/api";

const registerSchema = z.object({
    name: z.string().min(3, { message: "Name must contain at least 3 letters!" }),
    email: z.email({ message: "Invalid email format!" }),
    password: z.string().min(8, { message: "Password must contain at least 8 letters!" })
})

type registerProps = z.infer<typeof registerSchema>

export default function Register() {

    const { handleSubmit, register, formState: { errors } } = useForm<registerProps>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: registerProps) => {
        try {
            console.log(data)
            const result = await api.post("/auth/register", data)
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    return (<div
        className="w-full md:w-2/3 p-4">

        <h1 className="text-6xl text-left font-bold mb-2">
            Register
        </h1>
        <p className="text-md text-left after:w-full after:h-[1px] after:bg-gray-200 after:my-4 after:content-[''] after:block">You must have an account to continue</p>


        <form onSubmit={handleSubmit(onSubmit)} className="rounded-md  mx-auto">
            <Input error={errors.name?.message} register={register("name")} type="text" label="Name" id="name" />
            <Input error={errors.email?.message} register={register("email")} type="text" label="Email" id="email" />
            <Input error={errors.password?.message} register={register("password")} type="password" label="Password" id="password" />
            <Button title="Register" type="submit" />
        </form>
        <Link className="font-light text-sm hover:underline text-center mx-auto" href="/auth/login">Already have an account?
            <span className="text-blue-600"> Log in</span> </Link>
    </div>)
}