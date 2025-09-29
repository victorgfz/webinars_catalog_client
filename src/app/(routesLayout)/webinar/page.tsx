"use client"
import { FilterBar } from "@/components/container/FilterBar";
import { WebinarList } from "@/components/container/WebinarList";
import { useState } from "react";


type selectedFilters = {
    type: string,
    id: number,
    description: string
}


export default function Webinar() {

    const [selectedFilters, setSelectedFilters] = useState<selectedFilters[] | null>(null)

    console.log(selectedFilters)
    return (<div
        className="w-full p-4">
        <FilterBar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        <WebinarList dashboard={false} />
    </div>)
}