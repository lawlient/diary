import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import dayjs from "dayjs";


export default function MonthlyTitle({day, setday}) {
    const last = () => setday(dayjs(day).add(-1, "month").format("YYYY-MM"))
    const next = () => setday(dayjs(day).add(1, "month").format("YYYY-MM"))
    return (
        <div className="flex justify-center items-center">
            <IconButton onClick={last}> <ArrowLeft /> </IconButton>
            
            <span className="px-2">{dayjs(day).format("YYYY MMM OKR")}</span>

            <IconButton onClick={next}> <ArrowRight /> </IconButton>
        </div>
    )
}