import { Add, Remove } from "@mui/icons-material"
import { Button, IconButton, Typography } from "@mui/joy"
import dayjs from "dayjs"



export default function MonthlySidebar({day, setday}) {
    const mon = [0,1,2,3,4,5,6,7,8,9,10,11]

    return (
        <div className="flex flex-col gap-2 items-center">
            <Typography level='title-md'
                startDecorator={<IconButton onClick={() => setday(dayjs(day).add(-1, "year").format("YYYY-MM"))}><Remove /></IconButton>}
                endDecorator={<IconButton  onClick={() => setday(dayjs(day).add(1, "year").format("YYYY-MM"))}><Add /></IconButton>}
            >
                {dayjs(day).format("YYYY")}
            </Typography>
            {mon.map(m => (
                <Button key={m} variant="soft"
                    onClick={() => setday(dayjs(day).set('month', m).format("YYYY-MM"))}
                >
                    {dayjs().set('month',m).format("MMM")}
                </Button>
            ))}
        </div>
    )
}