import { Add, Remove } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/joy"
import dayjs from "dayjs"

function YearNav({day, setday}) {
    return (
        <div className="w-full flex justify-center">
            <Typography level='title-md'
                startDecorator={<IconButton onClick={() => setday(dayjs(day).add(-1, "year").format("YYYY-MM"))}><Remove /></IconButton>}
                endDecorator={<IconButton  onClick={() => setday(dayjs(day).add(1, "year").format("YYYY-MM"))}><Add /></IconButton>}
            >
                {dayjs(day).format("YYYY")}
            </Typography>
        </div>
    )
}

function MonthNav({day, setday}) {
    const mon = [0,1,2,3,4,5,6,7,8,9,10,11]

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            {mon.map(m => (
                <div key={m} className="w-1/2 bg-slate-100 text-center rounded-lg"
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
        <aside className="relative w-full pr-2 h-full overflow-auto hide-scrollbar flex flex-col justify-start items-start py-4">
            <YearNav day={day} setday={setday} />
            <MonthNav day={day} setday={setday} />
        </aside>
    )
}