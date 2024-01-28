import { useEffect, useState } from "react"
import { gettasklist } from "../api/api"
import { useResponsiveWidth } from "../hooks/WindowSize"
import NewTaskButton from "./NewTaskButton"
import { HourglassBottom, HourglassTop, Info } from "@mui/icons-material"

function TaskContent({t}) {
    return (
        <>
        <span className="text">{t.content}</span>
        <Info fontSize="sx"/>
        </>
    )
}

function TaskTime({t}) {
    const tformat = (min) => {
        if (min === 0) return "--"
        let h = Math.floor(min/60)
        let m = min % 60

        let res = ""
        if (h > 0) res = h + "h"
        if (m > 0) res = m + "m"
        return res
    }

    return (
        <div className="flex items-center gap-2" >
            <div className="text-gray-500 text-sm">
                <HourglassTop fontSize="sx"/>
                <span className="">{tformat(t.est)}</span>
            </div>
            <div className="text-gray-500 text-sm">
                <HourglassBottom fontSize="sx"/>
                <span className="">{tformat(t.act)}</span>
            </div>
        </div>
    )
}


function TaskOneline({t}) {
    return (
        <div className="flex justify-start items-start gap-3">
            <TaskContent t={t} />
            <TaskTime t={t} />
        </div>
    )
}

function TaskTwoline({t}) {
    return (
        <div className="">

        </div>
    )
}

function Task({t}) {
    const { sm } = useResponsiveWidth()
    return (
        <div className="w-full rounded bg-gray-200">
            {sm ?  <TaskOneline t={t} /> : <TaskTwoline t={t} />}
        </div>
    )
}


export default function TaskList({day}) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        gettasklist(day).then(res => {
            if (res.data.success) {
                setTasks(res.data.data)
            }
        })
    }, [day])

    return (
        <div className="w-full flex flex-col justify-start items-center gap-2" >
            {tasks.map(t => (
                <Task key={t.id} t={t} />
            ))}

            <NewTaskButton day={day} />
        </div>

    )
}