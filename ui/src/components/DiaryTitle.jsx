import { Mode } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import dayjs from "dayjs";

export default function DiaryTitle({day}) {
    return (
        <Typography level="title-lg" 
            startDecorator={<Mode />}
        >
            {dayjs(day).format("dddd")}
        </Typography>
    )
}