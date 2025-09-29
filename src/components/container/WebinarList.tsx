"use client"
import { useEffect, useState } from "react"
import { WebinarListItem } from "../shared/WebinarListItem"
import api from "@/services/api"

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

export const WebinarList = ({ dashboard }: { dashboard: boolean }) => {


    const [webinarList, setWebinarList] = useState<Webinar[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const getWebinarList = async () => {
            setLoading(true)
            try {
                const endpoint = dashboard ? "/webinar?userEnrolled=true" : "/webinar"
                const res = await api.get(endpoint)

                setWebinarList(res.data)

            } catch (error) {
                setWebinarList(null)

            } finally {
                setLoading(false)
            }
        }
        getWebinarList()

    }, [dashboard])

    if (loading) return <div>Loading...</div>

    return (<div className="flex flex-col items-start justify-center gap-4">


        {webinarList && webinarList.length > 0 ? webinarList.map((item) => <WebinarListItem key={item.id} id={item.id} title={item.title} summary={item.summary} speakers={item.speakers} categories={item.categories} datetime={item.datetime} duration={item.duration} language={item.language} userEnrolled={item.userEnrolled} />) : <p>No webinars added yet</p>}
    </div>)
}