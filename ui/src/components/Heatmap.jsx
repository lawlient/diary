import { useEffect, useState } from "react"

import dayjs from 'dayjs'


export default function Heatmap({day, setday}) {
    const [data, setData] = useState([])

    useEffect(() => {
        var days = []
        const dayofmonth = dayjs(day).daysInMonth()
        for (var d = 1; d <= dayofmonth; d++) {
            days.push({
                day: dayjs(day).set('date', d).format("YYYY-MM-DD"),
                count: d,
            })
        }
        setData(days)
    }, [day])


    return (
        <div className="flex flex-col items-center gap-2 w-full">

            <div className="grid grid-cols-7 gap-0.5 ">
                {
                    data.map((d, i) => (
                        <div key={i} className="bg-slate-200 w-4 h-4 border rounded"
                            onClick={() => setday(d.day)}
                        >

                        </div>
                    ))
                }
            </div>
        </div>
    )
}