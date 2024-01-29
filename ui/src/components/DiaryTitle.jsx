import dayjs from "dayjs";
import { useDay } from "./DayContext";

export default function DiaryTitle() {
    const [day] = useDay()

    return (
        <div className="w-full flex justify-center items-center py-3" > 
            <span className="text-lg text-gray-400">
                {dayjs(day).format("dddd")}
            </span>
        </div>
    )
}