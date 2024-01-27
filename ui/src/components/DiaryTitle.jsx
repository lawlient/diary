import dayjs from "dayjs";

export default function DiaryTitle({day}) {
    return (
        <div className="w-full flex justify-center items-center" > 
            <span className="text-lg text-gray-400">
                {dayjs(day).format("dddd")}
            </span>
        </div>
    )
}