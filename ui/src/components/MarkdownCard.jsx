import dayjs from "dayjs";
import { useEffect } from "react";

export default function MarkdownCard({data}) {

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="flex flex-col rounded-lg border border-gray-200 w-full p-4" >
            <div className="flex justify-between items-center pb-1">
                <div className="font-mono text-gray-400 text-xs">
                    {dayjs.unix(data.create_time).format("YYYY/MM/DD HH:mm:ss")  }
                </div>
                <div className="flex flex-end">
                    <span className="flex justify-center text-gray-400 text-md">...</span>
                </div>
            </div>
            <div className="">
                {data.content}
            </div>
        </div>
    )
}