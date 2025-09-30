"use client"
import { useEffect, useMemo, useState, Dispatch, SetStateAction } from "react"
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



export const WebinarList = ({ dashboard, filter, search, doSearch, setDoSearch }: { dashboard: boolean, filter: string | null, search: string, doSearch: string, setDoSearch: Dispatch<SetStateAction<string>> }) => {


    const [webinarList, setWebinarList] = useState<Webinar[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [endpoint, setEndpoint] = useState("/webinar")

    const memoizedFilter = useMemo(() => {
        return filter ?? null
    }, [filter])

    const memoizedSearch = useMemo(() => {
        return doSearch ?? null
    }, [doSearch])

    /*    useEffect(() => {
           
   
           setEndpoint(url)
       }, )
   
    */
    useEffect(() => {
        const getWebinarList = async () => {
            setLoading(true)
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
                console.log(endpoint)
                setWebinarList(res.data)
            } catch (error) {
                setWebinarList(null)
            } finally {
                setLoading(false)
            }
        }
        getWebinarList()

    }, [dashboard, memoizedFilter, memoizedSearch, doSearch])

    if (loading) return <div>Loading...</div>

    return (<div className="flex flex-col items-start justify-center gap-4">


        {webinarList && webinarList.length > 0 ? webinarList.map((item) => <WebinarListItem key={item.id} id={item.id} title={item.title} summary={item.summary} speakers={item.speakers} categories={item.categories} datetime={item.datetime} duration={item.duration} language={item.language} userEnrolled={item.userEnrolled} />) : <p>No webinars added yet</p>}
    </div>)
}