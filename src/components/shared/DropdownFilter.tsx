"use client"

import { ChevronDown } from "lucide-react"
import { useState, Dispatch, SetStateAction } from "react"

type selectedFilters = {
    type: string,
    id: number,
    description: string
}


type filterProps = {
    type: string
    items: {
        id: number,
        description: string
    }[]
}

type DropdownFilterProps = {
    selectedFilters: selectedFilters[] | null
    title: string
    filters?: filterProps[]
    setSelectedFilters: Dispatch<SetStateAction<selectedFilters[] | null>>;
}




export const DropdownFilter = ({ title, filters, setSelectedFilters, selectedFilters }: DropdownFilterProps) => {

    const [open, setOpen] = useState<boolean>(false)

    return <div className="relative">
        <button onClick={() => setOpen(!open)} className="py-2 px-4 cursor-pointer flex items-center justify-center">
            <p className="font-light transition-all duration-150 hover:underline">{title}</p>
            <ChevronDown size={16} className={`${open ? "rotate-z-180" : null} transition-all duration-150`} />
        </button>
        {open && <div className="bg-white border-[1px] border-gray-100 shadow-md absolute px-4 py-2 z-100 rounded-md divide-y divide-gray-200">
            {filters &&
                filters.map(item => <div key={item.type} className="flex flex-col items-start justify-center py-2">
                    <p className="capitalize text-sm mb-1">{item.type}</p>
                    {item.items.map(i => <div className="flex items-center justify-start gap-2" key={i.id}>
                        <input
                            onChange={(e) => {
                                const isChecked = e.target.checked
                                const selectedFiltersNotNull = selectedFilters ?? []
                                if (isChecked) setSelectedFilters([...selectedFiltersNotNull, { type: item.type, id: i.id, description: i.description }])
                                else setSelectedFilters(selectedFiltersNotNull.filter(j => !(j.id === i.id && j.type === item.type)))
                            }}
                            type="checkbox"
                            id={i.description}
                            name={item.type}
                            checked={selectedFilters?.some(j => j.id === i.id && j.type === item.type)}
                            value={i.description} />
                        <label className="font-light text-sm" htmlFor={i.description}>{i.description}</label>
                    </div>)}
                </div>)


            }</div>}
    </div>
}