'use client'

import api from "@/services/api"
import { handleApiError } from "@/utils/handleApiError"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"

type User = {
    id: number,
    name: string,
    email: string
}

export const Header = () => {

    const items = [{
        description: "Dashboard",
        path: "/dashboard"
    }, {
        description: "Webinars",
        path: "/webinar"
    },]

    const pathname = usePathname()

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true)
            try {
                const res = await api.get("/user")
                setUser(res.data)

            } catch (error) {

                setUser(null);
            } finally {
                setLoading(false)
            }
        };

        getUserInfo();
    }, []);


    if (loading) return <div>Loading...</div>

    return <header className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center justify-start gap-2">
            <User size={30} />
            <div>
                <p className="text-md leading-none">{user?.name ?? "User"}</p>
                <p className="text-sm opacity-75">{user?.email ?? null}</p>
            </div>
        </div>
        <nav className="flex items-center justify-center divide-x divide-gray-200">{items.map((item) => <Link key={item.path} className={`px-4 ${pathname.startsWith(item.path) ? "text-blue-600" : ""}`} href={item.path}> <p>{item.description}</p> </Link>)}</nav>
        <button className="flex items-center justify-end gap-2 hover:underline transition-all duration-150 px-4 py-2 text-sm rounded-full cursor-pointer">
            <LogOut className="opacity-75" size={24} />
            <p>Log Out</p>
        </button>

    </header>


}