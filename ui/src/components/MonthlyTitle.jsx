import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import dayjs from "dayjs";


export default function MonthlyTitle({day, setday}) {
    return (
        <Typography level="title-lg" 
            startDecorator={
                <IconButton onClick={() => setday(dayjs(day).add(-1, "month").format("YYYY-MM"))}>
                    <ArrowLeft />
                </IconButton>
            }
            endDecorator={
                <IconButton onClick={() => setday(dayjs(day).add(1, "month").format("YYYY-MM"))}>
                    <ArrowRight />
                </IconButton>
            }
        >
            {dayjs(day).format("YYYY-MM")}
        </Typography>
    )
}