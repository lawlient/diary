import { Add, Remove } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/joy"
import dayjs from "dayjs"


function YearNav({day, setday}) {
    const year = [2024, 2023, 2022, 2021, 2020]

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {year.map(y => (
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
        <aside className="relative w-full pr-2 h-full overflow-auto hide-scrollbar flex flex-col justify-start items-start py-4">
            <YearNav day={day} setday={setday} />
        </aside>
    )
}