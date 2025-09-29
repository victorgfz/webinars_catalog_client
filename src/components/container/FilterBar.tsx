"use client"

import { DropdownFilter } from "../shared/DropdownFilter"
import { Dispatch, SetStateAction } from "react"

type selectedFilters = {
    type: string,
    id: number,
    description: string
}

type filterBarProps = {
    selectedFilters: selectedFilters[] | null;
    setSelectedFilters: Dispatch<SetStateAction<selectedFilters[] | null>>;
};

export const FilterBar = ({ selectedFilters, setSelectedFilters }: filterBarProps) => {

    const filters = [
        {
            type: "categories",
            items: [{ id: 1, description: "Marketing" }, { id: 2, description: "AI" }, { id: 3, description: "Software" },]
        },
        {
            type: "speakers",
            items: [{ id: 1, description: "Teste" }, { id: 2, description: "Teste2" }, { id: 3, description: "AAAA" },]
        },
    ]


    return (<div className="w-full  mb-4">
        <div className="flex items-center justify-start gap-4">
            <DropdownFilter title="Filter by" filters={filters} setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
            <button>Apply filters</button>
        </div>
        <div className="flex gap-2">
            {selectedFilters && selectedFilters.length > 0 ? selectedFilters.map(item =>
                <div key={`${item.type}-${item.id}`} className="flex items-center justify-center rounded-full bg-gray-200 py-2 px-4">
                    <p className="text-sm font-light">{item.description}</p>

                </div>)

                : null}
        </div>

    </div>)
}