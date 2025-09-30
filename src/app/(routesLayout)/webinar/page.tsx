"use client"
import { FilterBar } from "@/components/container/FilterBar";
import { WebinarList } from "@/components/container/WebinarList";
import { convertSelectedFiltersToQuery } from "@/utils/convertSelectedFiltersToQuery";
import { useState } from "react";


type selectedFilters = {
    type: string,
    description: string
}


export default function Webinar() {

    const [selectedFilters, setSelectedFilters] = useState<selectedFilters[] | null>(null)
    const [search, setSearch] = useState<string>("")
    const [doSearch, setDoSearch] = useState<string>("")
    return (<div
        className="w-full p-4">
        <FilterBar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} search={search} setSearch={setSearch} doSearch={doSearch} setDoSearch={setDoSearch} />
        <WebinarList dashboard={false} filter={convertSelectedFiltersToQuery(selectedFilters)} search={search} doSearch={doSearch} setDoSearch={setDoSearch} />
    </div>)
}