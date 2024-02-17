import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getdiary, savediary } from "../api/api";
import MarkdownCard from "./MarkdownCard";
import Editor from "./Editor";
import { useDay } from "./DayContext";



export default function Diary() {
    const {day} = useDay()

    const [diary, setDiary] = useState({
        "day": dayjs(day).format("YYYY-MM-DD"),
        "content": "",
        "create_time": 0,
        "update_time": 0,
    })
    const [layout, setLayout] = useState(undefined)

    const newest = () => {
        getdiary(day).then(res => {
            if (res.data.success) {
                if (res.data.data.length == 1) {
                    setDiary(res.data.data[0])
                } else {
                    setDiary({
                        "day": dayjs(day).format("YYYY-MM-DD"),
                        "content": "",
                        "create_time": 0,
                        "update_time": 0,
                    })
                }
            } else {
                console.log(res.data.msg)
            }
        })
    }

    const quit = () => { newest() }
    const submit = () => { return savediary(diary) }
    useEffect(() => { newest() }, [day])


    return (
        <div className="w-full" onDoubleClick={() => setLayout('center')}>
            <MarkdownCard data={diary} />
            <Editor title={"Edit Diary"} data={diary.content} setData={(d) => setDiary({...diary, content:d})}
                layout={layout} setLayout={setLayout} quit={quit} save={submit}
            />
        </div>
    )
}