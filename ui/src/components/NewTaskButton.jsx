import dayjs from "dayjs"
import { useState } from "react"
import TaskEditorDialog from "./TaskEditorDialog"
import { addtask } from "../api/api"


export default function NewTaskButton({day}) {
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

    const save = () => { return addtask(task) }


    return (
        <div className="w-full">
            <button className="w-full flex justify-center items-center bg-blue-400 rounded-lg hover:bg-blue-500 h-5 "
                onClick={() => setLayout(true)} > + </button>
            <TaskEditorDialog task={task} setTask={setTask} layout={layout} setLayout={setLayout} save={save} />
        </div>
    )
}