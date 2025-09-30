"use client"

import { ChevronDown } from "lucide-react"
import { useState, Dispatch, SetStateAction } from "react"

type selectedFilters = {
    type: string,
    description: string
}


type filterProps = {
    type: string
    items: string[]
}

type DropdownFilterProps = {
    selectedFilters: selectedFilters[] | null
    title: string
    filters?: filterProps[]
    setSelectedFilters: Dispatch<SetStateAction<selectedFilters[] | null>>;
}




export const DropdownFilter = ({ title, filters, setSelectedFilters, selectedFilters }: DropdownFilterProps) => {

    const [open, setOpen] = useState<boolean>(false)

    return <div className="relative flex-1">
        <button onClick={() => setOpen(!open)} className="py-2 px-4 cursor-pointer flex items-center justify-center">
            <p className="font-light transition-all duration-150 hover:underline">{title}</p>
            <ChevronDown size={16} className={`${open ? "rotate-z-180" : null} transition-all duration-150`} />
        </button>
        {open && <div className="bg-white border-[1px] border-gray-100 shadow-md absolute px-4 py-2 z-100 rounded-md divide-y divide-gray-200">
            {filters && filters.length > 0 &&
                filters.map((item, index) => <div key={`${item.type}-${index}`} className="flex flex-col items-start justify-center py-2">
                    <p className="capitalize text-sm mb-1">{item.type}</p>
                    {item.items.map((i, iIndex) => <div className="flex items-center justify-start gap-2" key={`${i}-${iIndex}`}>
                        <input
                            onChange={(e) => {
                                const isChecked = e.target.checked
                                const selectedFiltersNotNull = selectedFilters ?? []
                                if (isChecked) setSelectedFilters([...selectedFiltersNotNull, { type: item.type, description: i }])
                                else setSelectedFilters(selectedFiltersNotNull.filter(j => !(j.description === i && j.type === item.type)))
                            }}
                            type="checkbox"
                            id={i}
                            name={item.type}
                            checked={selectedFilters ? selectedFilters?.some(j => j.description === i && j.type === item.type) : false}
                            value={i} />
                        <label className="font-light text-sm capitalize" htmlFor={i}>{i}</label>
                    </div>)}
                </div>)


            }</div>}
    </div>
}