import { BadgeCheck, Calendar, Languages, Timer } from "lucide-react";
import Link from "next/link"
import Countdown from "./Countdown";
import { formatDate } from "@/utils/formatDate";
import { formatLanguage } from "@/utils/formatLanguage";

type WebinarListItemProps = {
    id: number,
    title: string,
    summary: string,
    speakers: string[],
    categories: string[],
    datetime: Date,
    duration: number,
    language: string
    userEnrolled?: boolean
}

export const WebinarListItem = ({ id, title, summary, speakers, categories, datetime, duration, language, userEnrolled }: WebinarListItemProps) => {

    return (<div className="border-[1] rounded-md border-gray-200 p-8"><Link href={`/webinar/${id}`} >
        <h1 className="text-3xl font-bold mb-4 leading-none">{title}</h1>
        <p className="text-sm opacity-75 mb-4">{summary}</p>
        <div className="flex align-items justify-start gap-8 mb-4">
            <div>
                <h3 className="font-light text-sm opacity-75">Speakers</h3>
                <div className="flex items-center justify-start divide-x divide-gray-200">
                    {speakers.map((item, index) => <p key={`speaker-${index}`} className="font-regular text-sm px-2 first:pl-0">{item}</p>)}
                </div>
            </div>
            <div>
                <h3 className="font-light text-sm opacity-75">Categories</h3>
                <div className="flex items-center justify-start divide-x divide-gray-200">
                    {categories.map((item, index) => <p key={`category-${index}`} className="font-regular text-sm px-2 first:pl-0">{item}</p>)}
                </div>
            </div>
        </div>
        <div className="flex align-items justify-start gap-4 flex-wrap md:flex-nowrap">
            <div className="px-4 py-2 rounded-full bg-gray-200 flex items-center justify-center gap-2">
                <Calendar size={16} className="opacity-75" />
                <p className="text-sm font-light">{formatDate(datetime)}</p>
            </div>

            <div className="px-4 py-2 rounded-full bg-gray-200 flex items-center justify-center gap-2">
                <Timer size={16} className="opacity-75" />
                <p className="text-sm font-light">{Math.floor(duration / 60)} {duration / 60 < 2 ? "hour" : "hours"}</p>
            </div>

            <div className="px-4 py-2 rounded-full bg-gray-200 flex items-center justify-center gap-2">
                <Languages size={16} className="opacity-75" />
                <p className="text-sm font-light capitalize">{formatLanguage(language)}</p>
            </div>

            {userEnrolled && <div className="px-4 py-2 rounded-full bg-green-200 flex items-center justify-center gap-2 md:ml-auto">
                <BadgeCheck size={16} className="opacity-75" />

                <span className="w-[1px] h-full bg-gray-400"></span>
                <Countdown className="text-sm font-light " targetDate={new Date(datetime).getTime()} />

            </div>}

        </div>

    </Link ></div>)

}