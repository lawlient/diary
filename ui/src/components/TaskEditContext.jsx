import { createContext, useContext, useEffect, useState } from "react";
import { useDay } from "./DayContext";
import dayjs from "dayjs";


/* 共享任务列表编辑状态， 触发任务列表及日历状态的同步变化 */

const TaskEditContext = createContext()


const useTaskEdit = () => {
    const ctx = useContext(TaskEditContext)

    if (ctx === undefined) {
        throw new Error('useDay must be used within a DayProvider')
    }
    return ctx
}



const TaskEditProvider = (props) => {
    const [edit, setEdit] = useState(0)
    const {month} = useDay()

    useEffect(() => {
        setEdit(0)
    }, [month])

    return (
        <TaskEditContext.Provider value={[edit, setEdit]} {...props}>
            {props.children}
        </TaskEditContext.Provider>
    )
}

export { useTaskEdit, TaskEditProvider }