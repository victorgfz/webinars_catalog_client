import { ArrowLeft, CircleAlert } from "lucide-react"
import { useRouter } from 'next/navigation'


export const Error = ({ message, action, whatToDo }: { message: string, action: boolean, whatToDo?: string }) => {
    const router = useRouter()


    return <div className="w-full h-full py-2 flex flex-col items-center justify-center gap-2 ">
        <div className="flex items-center justify-center gap-2 text-red-900">
            <CircleAlert size={20} />
            <p className="text-md font-light">{message}</p>
        </div>
        {action &&
            <button onClick={() => whatToDo === "back" ? router.back() : router.push("/auth/login")} className="flex items-center justify-center hover:underline hover:opacity-100 duration-150 transition-all cursor-pointer opacity-70">
                <ArrowLeft size={16} />
                <p>Get back</p>
            </button>}


    </div>
}