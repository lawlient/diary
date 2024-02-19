import dayjs from "dayjs";
import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { useDay } from "./DayContext";


export default function TaskTitle() {
    const {day, setday} = useDay()

    const last = () => setday(dayjs(day).add(-1, "day"))
    const next = () => setday(dayjs(day).add(1, "day"))
    return (
        <div className="w-full flex justify-center items-center gap-2 md:py-3">
            <ArrowLeft onClick={last} className="text-gray-700 rounded-lg hover:bg-white hover:cursor-pointer"/>

            <div className="px-2">
                <span className="text-lg text-gray-700">{dayjs(day).format("MMM DD YYYY")}</span>
            </div>

            <ArrowRight className="text-gray-700 rounded-lg hover:bg-white hover:cursor-pointer" onClick={next}/>
        </div>
    )
}