import { Add, Remove } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/joy"
import dayjs from "dayjs"

function YearNav({day, setday}) {
    const last = () => setday(dayjs(day).add(-1, "year").format("YYYY-MM"))
    const next = () => setday(dayjs(day).add(1, "year").format("YYYY-MM"))

    return (
        <div className="w-full flex justify-center items-center">
            <div className="hover:bg-cyan-300 rounded hover:cursor-pointer" onClick={last}><Remove /></div>
            <div className="flex justify-center items-center px-2 text-lg">{dayjs(day).format("YYYY")}</div>
            <div className="hover:bg-cyan-300 rounded hover:cursor-pointer" onClick={next}><Add /></div>
        </div>
    )
}

function MonthNav({day, setday}) {
    const mon = [0,1,2,3,4,5,6,7,8,9,10,11]

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {mon.map(m => (
                <div key={m} className="w-1/2 h-9 hover:bg-cyan-300 flex justify-center items-center rounded-lg hover:cursor-pointer"
                    onClick={() => setday(dayjs(day).set('month', m).format("YYYY-MM"))}
                >
                    {dayjs().set('month',m).format("MMM")}
                </div>
            ))}
        </div>
    )
}


export default function MonthlySidebar({day, setday}) {

    return (
        <aside className="relative w-full h-full overflow-auto hide-scrollbar flex flex-col justify-start items-start py-8 gap-4">
            <YearNav day={day} setday={setday} />
            <MonthNav day={day} setday={setday} />
        </aside>
    )
}