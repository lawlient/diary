import { IconButton, Typography } from "@mui/joy";
import dayjs from "dayjs";

import { ArrowLeft, ArrowRight } from '@mui/icons-material'


export default function TaskTitle({day, setday}) {
    return (
        <Typography level="title-lg" 
            startDecorator={
                <IconButton onClick={() => setday(dayjs(day).add(-1, "day"))}>
                    <ArrowLeft />
                </IconButton>
            }
            endDecorator={
                <IconButton onClick={() => setday(dayjs(day).add(1, "day"))}>
                    <ArrowRight />
                </IconButton>
            }
        >
            {dayjs(day).format("YYYY-MM-DD")}
        </Typography>
    )
}