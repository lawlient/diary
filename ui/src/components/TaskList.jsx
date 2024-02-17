import { useEffect, useState } from "react"
import { edittask, gettasklist } from "../api/api"
import { useResponsiveWidth } from "../hooks/WindowSize"
import NewTaskButton from "./NewTaskButton"
import { HourglassBottom, HourglassTop, More, MoreHoriz, MoreVert } from "@mui/icons-material"
import { useDay } from "./DayContext"
import { useTaskEdit } from "./TaskEditContext"
import TaskEditorDialog from "./TaskEditorDialog"
import dayjs from "dayjs"

function TaskContent({t}) {
    const todo = (t.status === "TODO")
    const done = (t.status === "DONE")
    const disc = (t.status === "DISCARD")
    return (
        <div className={`w-full flex items-center text gap-1 sm:w-1/3 ${disc ? "line-through text-gray-400": "text-black"} `}>
            <span className="w-4 h-4 leading-4 mx-1 mr-2 mt-1 border rounded box-border text-lg cursor-pointer shadow-inner hover:opacity-80">{done && '✓'}</span>
            <span className="">{t.content}</span>
        </div>
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
        <div className="flex gap-2">
            <div className="flex justify-center items-center px-2 rounded bg-slate-200 text-gray-500 text-xs gap-1">
                <HourglassTop fontSize="sx"/>
                {tformat(t.est)}
            </div>
            <div className="flex justify-center items-center px-2 rounded bg-slate-200 text-gray-500 text-xs gap-1">
                <HourglassBottom fontSize="sx"/>
                {tformat(t.act)}
            </div>
        </div>
    )
}


function TaskOneline({t}) {
    return (
        <div className={`w-full flex flex-row justify-start items-center gap-2 relative`}>
            <TaskContent t={t} />
            <TaskTime t={t} />
            <span className="absolute right-0.5">
                <MoreHoriz fontSize="sx"/>
            </span>
        </div>
    )
}

function TaskTwoline({t}) {
    return (
        <div className={`w-full flex flex-col justify-center items-start gap-2 relative`}>
            <TaskContent t={t} />
            <TaskTime t={t} />
            <span className="absolute right-0.5">
                <MoreVert fontSize="sx"/>
            </span>
        </div>
    )
}

function Task({t, setTask, setLayout}) {
    const { sm } = useResponsiveWidth()

    return (
        <div className="w-full flex justify-start items-center rounded bg-slate-50 hover:bg-white px-3 py-1"
        onDoubleClick={() => {
            setTask(t)
            setLayout(true)
        }}
        >
            {sm ?  <TaskOneline t={t} /> : <TaskTwoline t={t} />}
        </div>
    )
}


export default function TaskList() {
    const {day} = useDay()
    const [edit] = useTaskEdit()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        gettasklist(day).then(res => {
            if (res.data.success) {
                setTasks(res.data.data)
            }
        })
    }, [day, edit])

    const [task, setTask] = useState({
        day: dayjs(day).format("YYYY-MM-DD"),
        content: "",
        est: 0,
        act: 0,
        status: "TODO",
    })
    const resetTask = () => {
        setTask({
            day: dayjs(day).format("YYYY-MM-DD"),
            content: "",
            est: 0,
            act: 0,
            status: "TODO",
        })
    }
    const [layout, setLayout] = useState(false)

    const save = () => { return edittask(task) }

    useEffect(() => {
        if (layout === false) {
            resetTask()
        }
    }, [day, layout])

    return (
        <>
        <div className="w-full flex flex-col justify-start items-center gap-0.5 " >
            {tasks.map(t => (
                <Task key={t.id} t={t} setTask={setTask} setLayout={setLayout} />
            ))}

            <NewTaskButton day={day} />
        </div>
        <TaskEditorDialog task={task} setTask={setTask} layout={layout} setLayout={setLayout} save={save} />
        </>
    )
}