"use client"

import api from "@/services/api"
import { DropdownFilter } from "../shared/DropdownFilter"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SearchBar } from "../shared/SearchBar"
import { Error } from "../shared/Error"
import { handleApiError } from "@/utils/handleApiError"
import { Skeleton } from "../ui/skeleton"


type Filter = {
    type: string,
    items: string[]
}

type selectedFilters = {
    type: string,
    description: string
}

type filterBarProps = {
    selectedFilters: selectedFilters[] | null,
    setSelectedFilters: Dispatch<SetStateAction<selectedFilters[] | null>>,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    setDoSearch: Dispatch<SetStateAction<string>>,
};

export const FilterBar = ({ selectedFilters, setSelectedFilters, search, setSearch, setDoSearch }: filterBarProps) => {


    const [filters, setFilters] = useState<Filter[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [errorState, setErrorState] = useState<unknown>(null)

    useEffect(() => {
        const getFilters = async () => {
            setLoading(true)
            setErrorState(null)
            try {
                const res = await api.get("/filter")
                setFilters(res.data)
            } catch (error) {
                setFilters(null)
                setErrorState(error)
            } finally {
                setLoading(false)
            }
        }
        getFilters()
    }, [])

    if (loading) return <div className="w-full"><Skeleton className="rounded-md w-full h-15 mb-4" /></div>
    if (errorState) return null


    return (<div className="w-full  mb-4">
        <div className="flex items-center justify-center gap-4">
            <DropdownFilter title="Filter by" filters={filters ? filters : []} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
            <SearchBar search={search} setSearch={setSearch} setDoSearch={setDoSearch} />
        </div>
        <div className="flex gap-2 mt-2">

            {selectedFilters && selectedFilters.length > 0 ? selectedFilters.map(item => {
                let bgColor
                if (item.type === "speakers") bgColor = "bg-amber-100"
                else if (item.type === "categories") bgColor = "bg-purple-100"
                else bgColor = "bg-orange-100"
                return (<div key={`${item.type}-${item.description}`} className={`flex items-center justify-center rounded-full py-2 px-4 ${bgColor}`}>
                    <p className="text-sm font-light capitalize">{item.description}</p>

                </div>)
            })

                : null}
        </div>



    </div>)
}