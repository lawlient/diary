import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import dayjs from "dayjs";


export default function MonthlyTitle({day, setday}) {
    const last = () => setday(dayjs(day).add(-1, "month").format("YYYY-MM"))
    const next = () => setday(dayjs(day).add(1, "month").format("YYYY-MM"))
    return (
        <div className="w-full flex justify-center items-center gap-2 md:pt-6">
            <div className="text-gray-400 hover:bg-white hover:cursor-pointer rounded" onClick={last}><ArrowLeft /></div>
            
            <span className="px-2 text-gray-400">{dayjs(day).format("MMM YYYY OKR")}</span>

            <div className="text-gray-400 hover:bg-white hover:cursor-pointer rounded" onClick={next}> <ArrowRight /> </div>
        </div>
    )
}