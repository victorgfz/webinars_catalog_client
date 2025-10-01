"use client"
import { useEffect, useMemo, useState } from "react"
import { WebinarListItem } from "../shared/WebinarListItem"
import api from "@/services/api"
import { Error } from "../shared/Error"
import { handleApiError } from "@/utils/handleApiError"
import { Skeleton } from "../ui/skeleton"

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



export const WebinarList = ({ dashboard, filter, doSearch }: { dashboard: boolean, filter: string | null, doSearch: string | null, }) => {


    const [webinarList, setWebinarList] = useState<Webinar[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [errorState, setErrorState] = useState<unknown>(null)

    const memoizedFilter = useMemo(() => {
        return filter ?? null
    }, [filter])

    const memoizedSearch = useMemo(() => {
        return doSearch ?? null
    }, [doSearch])

    useEffect(() => {
        const getWebinarList = async () => {
            setLoading(true)
            setErrorState(null)
            try {
                let endpoint = "/webinar"

                if (dashboard) {
                    endpoint += "?userEnrolled=true"
                } else if (memoizedFilter && doSearch) {
                    endpoint += "?" + memoizedFilter + "&search=" + memoizedSearch
                } else if (memoizedFilter && !doSearch) {
                    endpoint += "?" + memoizedFilter
                } else if (!memoizedFilter && doSearch) {
                    endpoint += "?search=" + memoizedSearch
                }
                const res = await api.get(endpoint)

                setWebinarList(res.data)
            } catch (error) {
                setErrorState(error)
                setWebinarList(null)
            } finally {
                setLoading(false)
            }
        }
        getWebinarList()

    }, [dashboard, memoizedFilter, memoizedSearch, doSearch])


    if (loading) return <div className="flex flex-col items-start- justify-center gap-4">{Array.from({ length: 3 }).map((item, index) => <Skeleton key={`item-${index}`} className="w-full rounded-md h-75" />)}</div>
    if (errorState) return <Error message={handleApiError.message(errorState)} action={true} whatToDo={handleApiError.action(errorState)} />


    return (<div className="flex flex-col items-start justify-center gap-4">


        {webinarList && webinarList.length > 0 ? webinarList.map((item) => <WebinarListItem key={item.id} id={item.id} title={item.title} summary={item.summary} speakers={item.speakers} categories={item.categories} datetime={item.datetime} duration={item.duration} language={item.language} userEnrolled={item.userEnrolled} />) : <p className="font-light opacity-50 text-center mx-auto h-full">No webinars added yet</p>}
    </div>)
}