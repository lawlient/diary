import { Typography } from "@mui/joy";
import dayjs from "dayjs";

export default function DiaryTitle({day}) {
    return (
        <Typography level="title-lg" > {dayjs(day).format("dddd")} </Typography>
    )
}