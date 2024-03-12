import dayjs from "dayjs";
import { marked } from "../ext/marked";
import '../less/markdown-card.less'

export default function MarkdownCard({data}) {
    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white w-full px-4 min-h-96 dark:bg-zinc-800 dark:border-gray-600">
            <div className="flex justify-between items-center py-1">
                <div className="font-mono text-gray-400 text-xs italic dark:text-gray-200">
                    {data.create_time > 0 && dayjs.unix(data.create_time).format("YYYY/MM/DD HH:mm:ss")}
                </div>
                <div className="flex flex-end">
                    <span className="flex justify-center text-gray-400 text-md dark:text-gray-200">...</span>
                </div>
            </div>
            <div className={`markdown-card-wrapper`} >
                <div className="markdown-card-text ">
                    {marked(data.content)}
                </div>
            </div>
        </div>
    )
}
