import dayjs from "dayjs"
import { useEffect, useState } from "react"


function YearNav({day, setday}) {
    const [list, setList] = useState([])

    useEffect(() => {

    }, [day])

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {list.map(y => (
                <div key={y} className="w-1/2 bg-slate-100 text-center rounded-lg"
                    onClick={() => setday(dayjs(day).set('year', y).format("YYYY"))}
                >
                    {dayjs().set('year',y).format("YYYY")}
                </div>
            ))}
        </div>
    )
}


export default function YearlySidebar({day, setday}) {

    return (
        <aside className="relative w-full pr-2 h-full overflow-auto hide-scrollbar flex flex-col justify-start items-start py-8">
            <YearNav day={day} setday={setday} />
        </aside>
    )
}