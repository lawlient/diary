import { IconButton, Typography } from "@mui/joy";
import dayjs from "dayjs";

import { ArrowLeft, ArrowRight } from '@mui/icons-material'


export default function TaskTitle({day, setday}) {
    const last = () => setday(dayjs(day).add(-1, "day").format("YYYY-MM-DD"))
    const next = () => setday(dayjs(day).add(1, "day").format("YYYY-MM-DD"))
    return (
        <div className="w-full flex justify-center items-center gap-2 md:pt-6">
            <ArrowLeft onClick={last} className="text-gray-400 rounded-lg hover:bg-white hover:cursor-pointer"/>

            <div className="px-2">
                <span className="text-lg text-gray-400">{dayjs(day).format("MMM DD YYYY")}</span>
            </div>

            <ArrowRight className="text-gray-400 rounded-lg hover:bg-white hover:cursor-pointer" onClick={next}/>
        </div>
    )
}