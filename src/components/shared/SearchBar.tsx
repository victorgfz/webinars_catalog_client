"use client"

import { Search } from "lucide-react"

import { Dispatch, SetStateAction } from "react"


type searchBarProps = {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
    setDoSearch: Dispatch<SetStateAction<string>>,
}

export const SearchBar = ({ search, setSearch, setDoSearch }: searchBarProps) => {



    return (
        <form onSubmit={(e) => e.preventDefault()} className=" w-3/4 flex items-center justify-end relative">

            <input value={search ?? ""} onChange={(e) => setSearch(e.target.value)} id="search" className={`border-1 w-full border-gray-200 rounded-md py-2 px-4 focus:outline-none focus:border-gray-950 `} type="text" placeholder="Search" />
            <button type="submit" onClick={() => { setDoSearch(search) }} className="absolute mr-2"><Search size={20} /></button>
        </form>


    )
}