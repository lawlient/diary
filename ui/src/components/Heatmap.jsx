import { useEffect, useState } from "react"

import dayjs from 'dayjs'
import { useDay } from "./DayContext"
import { useTaskEdit } from "./TaskEditContext"
import { counttask } from "../api/api"


export default function Heatmap() {
    const {day, month, setday} = useDay()
    const [edit] = useTaskEdit()

    const initCount = () => {
        let count = []
        for (var i = 1; i <= dayjs(day).daysInMonth(); i++) {
            count.push({
                day: dayjs(day).set('date', i).format("YYYY-MM-DD"),
                count: 0,
            })
        }
        return count
    }
    const [data, setData] = useState(initCount())

    useEffect(() => {
        let days = dayjs(day).daysInMonth()
        let b = dayjs(day).set('date', 1).format("YYYY-MM-DD")
        let e = dayjs(day).set('date', days).format("YYYY-MM-DD")
        counttask(b, e).then(res => {
            var tmp = initCount()
            if (res.data.success) {
                for (const d of res.data.data) {
                    let index = dayjs(d.day).date() - 1;
                    tmp[index].count = d.count
                }
            }
            setData(tmp)
        })
    }, [month, edit])

    const firstday = 0/* sunday */
    const last = () => setday(dayjs(day).add(-1, "month"))
    const next = () => setday(dayjs(day).add(1, "month"))
    const reset = () => setday(dayjs())

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div className="grid grid-cols-7 grid-flow-row gap-0.5">
                <div className="col-start-1 col-span-1 flex justify-center items-center w-4 h-4 bg-gray-200 border rounded hover:cursor-pointer"
                onClick={last}>{'-'}</div>
                <div className="col-start-2 col-span-5 flex justify-center items-center bg-gray-200 text-xs/[0px] border rounded hover:cursor-pointer"
                onClick={reset}>{dayjs(month).format("MMM YYYY")}</div>
                <div className="col-start-7 col-span-1 flex justify-center items-center w-4 h-4 bg-gray-200 border rounded hover:cursor-pointer"
                onClick={next}>{'+'}</div>

                <div className="col-start-2 w-4 h-4 flex justify-center items-center text-gray-400 text-xs/[0px]">{firstday ? "二" : "一"}</div>
                <div className="col-start-4 w-4 h-4 flex justify-center items-center text-gray-400 text-xs/[0px]">{firstday ? "四" : "三"}</div>
                <div className="col-start-6 w-4 h-4 flex justify-center items-center text-gray-400 text-xs/[0px]">{firstday ? "六" : "五"}</div>


                {
                    data.map((d, i) => {
                        const date = d.day
                        const count = d.count
                        const colorLevel = 
                              count <= 0 ? "bg-gray-200" 
                            : count <= 1 ? "bg-cyan-400"
                            : count <= 2 ? "bg-cyan-500"
                            : count <= 3 ? "bg-cyan-600"
                            : count <= 4 ? "bg-cyan-700"
                            : "bg-cyan-800"
                        const colstart = (i) => {
                            if (i > 0) return ""
                            switch (dayjs(day).set('date', 1).day()) {
                                case 0: return firstday ? "col-start-7" : "col-start-1" 
                                case 1: return firstday ? "col-start-1" : "col-start-2" 
                                case 2: return firstday ? "col-start-2" : "col-start-3" 
                                case 3: return firstday ? "col-start-3" : "col-start-4" 
                                case 4: return firstday ? "col-start-4" : "col-start-5" 
                                case 5: return firstday ? "col-start-5" : "col-start-6" 
                                case 6: return firstday ? "col-start-6" : "col-start-7" 
                                default: return ""
                            }
                        }

                        return (
                            <div key={i} className={`${colorLevel} ${colstart(i)} w-4 h-4 border rounded hover:cursor-pointer ${date === day ? "border border-black dark:border-gray-400" : ""}`}
                            onClick={() => setday(d.day)}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}