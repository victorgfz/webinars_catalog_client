"use client"

import { CategoriesForm } from "@/components/container/CategoriesForm";
import { NewWebinarForm } from "@/components/container/NewWebinarForm";
import { SpeakersForm } from "@/components/container/SpeakersForm";
import { Error } from "@/components/shared/Error";
import api from "@/services/api";
import { handleApiError } from "@/utils/handleApiError";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
type Category = {
    id: number,
    description: string
}

type Speaker = {
    id: number,
    name: string
}

export default function AddWebinarPage() {
    const [categories, setCategories] = useState<Category[] | null>(null)
    const [speakers, setSpeakers] = useState<Speaker[] | null>(null)

    const [loading, setLoading] = useState<boolean>(true)
    const [errorState, setErrorState] = useState<unknown>(null)

    const router = useRouter()

    useEffect(() => {
        const getCategoriesAndSpeakers = async () => {
            setLoading(true)
            setErrorState(null)
            try {
                const resCategories = await api.get("/filter/categories")
                setCategories(resCategories.data)
                const resSpeakers = await api.get("/filter/speakers")
                setSpeakers(resSpeakers.data)
            } catch (error) {
                setErrorState(error)
                setCategories(null)
                setSpeakers(null)
            } finally {
                setLoading(false)
            }

        }
        getCategoriesAndSpeakers()
    }, [])

    if (loading) return <div>Loading...</div>
    if (errorState) return <Error message={handleApiError.message(errorState)} action={false} />

    return (<main className="w-full py-4">
        <button className="text-center mb-4 hover:underline transition-all duration-150 opacity-70 hover:opacity-100 cursor-pointer" onClick={() => router.push("/auth/login")}>Back to login</button>
        <div className="flex w-full justify-center items-center gap-4 mb-4">
            <CategoriesForm />
            <SpeakersForm />
        </div>

        <NewWebinarForm categories={categories} speakers={speakers} />

    </main>)
}