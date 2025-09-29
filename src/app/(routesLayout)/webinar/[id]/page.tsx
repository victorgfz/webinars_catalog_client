"use client"
import { AlreadyEnrolled } from '@/components/container/AlreadyEnrolled'
import { EnrollmentForm } from '@/components/container/EnrollmentForm'
import api from '@/services/api'
import { formatDate } from '@/utils/formatDate'
import { formatLanguage } from '@/utils/formatLanguage'
import { Calendar, Languages, Timer } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Webinar = {
    id: number,
    title: string,
    summary: string,
    duration: number,
    language: string,
    datetime: Date
    categories: string[],
    speakers: string[],
    userEnrolled: boolean
}


export default function WebinarPage() {
    const params = useParams()

    const [webinar, setWebinar] = useState<Webinar | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [reload, setReload] = useState<boolean>(false)


    useEffect(() => {
        const getWebinar = async () => {
            setLoading(true)
            try {
                const res = await api.get(`/webinar/${params.id}`)
                setWebinar(res.data)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }
        getWebinar()
    }, [params.id])



    if (loading) return <div>Loading...</div>

    console.log(webinar)

    return (<div className="w-full px-4 py-8">
        <div className='py-8'>
            <h1 className="text-6xl font-bold mb-4">{webinar?.title}</h1>
            <p className='text-lg after:bg-gray-100 after:w-full after:h-[1px] after:block after:my-8'>{webinar?.summary}</p>
            <div className="flex items-center justify-start gap-8 mb-4 ">
                <div >
                    <h3 className="font-light text-md opacity-75">Speakers</h3>
                    <div className="flex items-center justify-start divide-x divide-gray-200">
                        {webinar?.speakers.map((item, index) => <p key={`speaker-${index}`} className="font-regular text-lg px-2 first:pl-0">{item}</p>)}
                    </div>
                </div>
                <div >
                    <h3 className="font-light text-md opacity-75">Categories</h3>
                    <div className="flex items-center justify-start divide-x divide-gray-200">
                        {webinar?.categories.map((item, index) => <p key={`category-${index}`} className="font-regular text-lg px-2 first:pl-0">{item}</p>)}
                    </div>
                </div>
            </div>
            <div className='after:bg-gray-100 after:w-full after:h-[1px] after:block after:my-8'>
                <div className="flex items-center justify-start gap-8 flex-wrap md:flex-nowrap">
                    <div className="flex items-center justify-center gap-2">
                        <Calendar size={16} className="opacity-75" />
                        <p className="text-md font-light">{webinar?.datetime && formatDate(webinar.datetime)}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <Timer size={16} className="opacity-75" />
                        <p className="text-md font-light">{webinar?.duration && webinar.duration / 60} {webinar?.duration && webinar.duration / 60 == 1 ? "hour" : "hours"}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <Languages size={16} className="opacity-75" />
                        <p className="text-md font-light">{webinar?.language && formatLanguage(webinar.language)}</p>
                    </div>



                </div>
            </div>
        </div>
        {(webinar?.userEnrolled || reload) ? (webinar?.datetime ? <AlreadyEnrolled datetime={webinar.datetime} /> : null) : <EnrollmentForm setReload={setReload} webinarId={webinar?.id ?? 0} />}

    </div>)
}