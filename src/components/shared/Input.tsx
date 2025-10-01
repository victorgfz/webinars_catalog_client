"use client"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type inputProps = {
    id: string,
    type: "text" | "email" | "url" | "password" | "number",
    label: string,
    placeholder?: string,
    register?: UseFormRegisterReturn
    error?: string
}



export const Input = ({ id, type, label, placeholder, register, error }: inputProps) => {

    const [seePassword, setSeePassword] = useState(false)

    return (<div className="flex flex-col items-start justify-center mb-4">
        <label className="mb-1" htmlFor={id}>{label}</label>
        <div className="flex items-center justify-end relative w-full">
            <input {...register} id={id} placeholder={placeholder} type={type === "password" && seePassword ? "text" : type} className={`border-1 border-gray-200 rounded-md w-full py-2 px-4 focus:outline-none focus:border-gray-950 `} />
            {type === "password" ? <button className="absolute mr-2" type="button" onClick={() => setSeePassword(!seePassword)}>{seePassword ? <EyeClosed size={16} /> : <Eye size={16} />}</button> : null}

        </div>
        {error && <p className="text-red-400 font-light text-left text-sm">{error}</p>}
    </div>)
}
