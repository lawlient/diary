import { useEffect, useState } from "react"
import { getdiary, getmonthly, savemonthly } from "../api/api"
import dayjs from "dayjs"
import MarkdownCard from "./MarkdownCard"
import Editor from "./Editor"


export default function MOKR({day}) {
    const [okr,setOkr] = useState({
        "day": dayjs(day).format("YYYY-MM"),
        "content":"",
        "create_time": 0,
        "update_time": 0,
    })
    const [layout, setLayout] = useState(undefined)

    const newset = () => {
        getmonthly(day).then(res => {
            if (res.data.success && (res.data.data.length === 1)) {
                setOkr(res.data.data[0])
            } else {
                console.log(res.data)
                setOkr({
                    "day": dayjs(day).format("YYYY-MM"),
                    "content": "",
                    "create_time": 0,
                    "update_time": 0,
                })
            }
        })
    }

    const quit = () => { newset() }
    const submit = () => { return savemonthly(okr) }
    useEffect(() => { newset() }, [day])

    return (
        <div className="w-full" onDoubleClick={() => setLayout('center')}>
            <MarkdownCard data={okr} />
            <Editor title={"OKR Editor"} data={okr.content} setData={(d) => setOkr({...okr, content:d})}
            layout={layout} setLayout={setLayout} quit={quit} save={submit} />
        </div>
    )
}