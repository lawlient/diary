import { Button, Card, Textarea } from "@mui/joy";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getdiary, savediary } from "../api/api";
import MarkdownCard from "./MarkdownCard";



export default function Diary({day}) {
    const [diary, setDiary] = useState({
        "day": dayjs(day).format("YYYY-MM-DD"),
        "content": "",
        "create_time": 0,
        "update_time": 0,
    })

    useEffect(() => {
        getdiary(day).then(res => {
            if (res.data.success) {
                if (res.data.data.length == 1) {
                    setDiary(res.data.data[0])
                } else {
                    console.log(res.data.data.length)
                }
            } else {
                console.log(res.data.msg)
            }
        })
    }, [day])

    return (
        <MarkdownCard data={diary} />
    )
}