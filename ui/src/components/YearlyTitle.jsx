import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import dayjs from "dayjs"




export default function YearlyTitle({day, setday}) {
    const last = () => setday(dayjs(day).add(-1, "year").format("YYYY"))
    const next = () => setday(dayjs(day).add(1, "year").format("YYYY"))
    return (
        <div className="w-full flex justify-center items-center gap-2 py-3">
            <div className="text-gray-700 hover:bg-white hover:cursor-pointer rounded dark:text-gray-200" onClick={last}><ArrowLeft /></div>
            
            <span className="px-2 text-gray-700 dark:text-gray-200">{dayjs(day).format("YYYY OKR")}</span>

            <div className="text-gray-700 hover:bg-white hover:cursor-pointer rounded dark:text-gray-200" onClick={next}> <ArrowRight /> </div>
        </div>
    )
}
