import { WebinarList } from "@/components/container/WebinarList";


export default function Dashboard() {
    return (<div
        className="w-full p-4">
        <WebinarList dashboard={true} filter={null} doSearch={null} />
    </div>)
}