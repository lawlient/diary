import dayjs from "dayjs";
import Marked from "./Marked";

export default function MarkdownCard({data}) {
    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white w-full px-4 min-h-96">
            <div className="flex justify-between items-center py-1">
                <div className="font-mono text-gray-400 text-xs">
                    {dayjs.unix(data.create_time).format("YYYY/MM/DD HH:mm:ss")  }
                </div>
                <div className="flex flex-end">
                    <span className="flex justify-center text-gray-400 text-md">...</span>
                </div>
            </div>
            <Marked text={data.content} />
        </div>
    )
}