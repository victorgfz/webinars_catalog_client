import { BadgeCheck } from "lucide-react"
import Countdown from "../shared/Countdown"


export const AlreadyEnrolled = ({ datetime }: { datetime: Date }) => {

    return (<div className="p-8 border-[1px] border-green-200 rounded-md flex flex-col items-center justify-center gap-2">
        <BadgeCheck size={36} className="text-green-600" />
        <h2 className="text-2xl text-green-600">You are already enrolled for this webinar!</h2>
        <Countdown className="text-green-600 border-green-200 border-[1px] p-4 rounded-full" targetDate={new Date(datetime).getTime()} />
    </div>)
}