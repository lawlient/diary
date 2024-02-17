import { useEffect, useState } from "react"

import dayjs from 'dayjs'
import { useDay } from "./DayContext"
import { useTaskEdit } from "./TaskEditContext"
import { counttask } from "../api/api"


export default function Heatmap() {
    const {day, month, setday} = useDay()
    const [edit] = useTaskEdit()
    const [colstart, setColstart] = useState("col-start-" + dayjs(day).set('date', 1).day())

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

    useEffect(() => {
        setColstart("col-start-" + dayjs(day).set('date', 1).day())
    }, [day])

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div className={`grid grid-cols-7 gap-0.5 before:${colstart}`}>
                {
                    data.map((d, i) => {
                        const date = d.day
                        const count = d.count
                        const colorLevel = count <= 0
                            ? "bg-gray-200" : count <=1
                            ? "bg-cyan-400" : count <= 2
                            ? "bg-cyan-500" : count <= 3
                            ? "bg-cyan-600" : count <= 4
                            ? "bg-cyan-700" : "bg-cyan-800"

                        return (
                            <div key={i} className={`${colorLevel} w-4 h-4 border rounded ${date === day ? "border border-black dark:border-gray-400" : ""}`}
                            onClick={() => setday(d.day)}>
                                <span className=""></span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}