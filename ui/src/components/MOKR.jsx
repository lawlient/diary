import { useEffect, useState } from "react"
import { getdiary, getmonthly } from "../api/api"
import dayjs from "dayjs"
import MarkdownCard from "./MarkdownCard"


export default function MOKR({day}) {
    const [okr,setOkr] = useState({
        "day": dayjs(day).format("YYYY-MM"),
        "content":"",
        "create_time": 0,
        "update_time": 0,
    })

    useEffect(() => {
        getmonthly(day).then(res => {
            if (res.data.success) {
                if (res.data.data.length == 1) {
                    setOkr(res.data.data[0])
                }
            }
        })
    }, [day])

    return (
        <MarkdownCard data={okr} />
    )
}