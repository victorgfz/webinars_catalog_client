"use client"

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import api from "@/services/api";
import { toast } from "sonner"
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from 'next/navigation'
import { ArrowRight } from "lucide-react";
import Cookies from 'js-cookie'

const loginSchema = z.object({
    email: z.email({ message: "Make sure you enter a valid email!" }),
    password: z.string().min(1, "Required field.")
})

type loginProps = z.infer<typeof loginSchema>

export default function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm<loginProps>({
        resolver: zodResolver(loginSchema)
    })

    const router = useRouter()

    const onSubmit = async (data: loginProps) => {
        try {
            const result = await api.post("/auth/login", data)

            if (result.status === 200) {
                localStorage.setItem('token', result.data.token)


                Cookies.set('authToken', result.data.token, {
                    expires: 1,
                    secure: true,
                    sameSite: 'strict'
                })

                toast.success(result.data.message)
                router.push("/dashboard")
            }
        } catch (error) {
            toast.error(handleApiError.message(error))
        }
    }

    return (
        <div className="w-full md:w-2/3 p-4">
            <h1 className="text-6xl text-left font-bold mb-2">
                Login
            </h1>
            <p className="text-md text-left after:w-full after:h-[1px] after:bg-gray-200 after:my-4 after:content-[''] after:block">
                You must login to continue
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-md mx-auto">
                <Input error={errors.email?.message} register={register("email")} type="text" label="Email" id="email" />
                <Input error={errors.password?.message} register={register("password")} type="password" label="Password" id="password" />
                <Button title="Login" type="submit" />
            </form>

            <Link className="font-light text-sm hover:underline text-center mx-auto mb-8" href="/auth/register">
                Not registered yet?
                <span className="text-blue-600"> Create an account</span>
            </Link>

            <Link className="font-light text-sm hover:underline text-center mx-auto flex justify-start items-center gap-1" href="/add-webinar">
                Add webinars page <ArrowRight size={12} />
            </Link>
        </div>
    )
}