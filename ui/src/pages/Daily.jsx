import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'

import Diary from "../components/Diary";
import TaskTitle from "../components/TaskTitle";
import DiaryTitle from "../components/DiaryTitle";
import DailySidebar from "../components/DailySidebar";


export default function Daily() {
    const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"))


    return (
        <section className="flex w-full">
            <div className="flex flex-col items-center w-[calc(100%-14rem)] gap-3">
                <TaskTitle day={day} setday={setDay} />
                <DiaryTitle day={day} />
                <Diary day={day} />
            </div>
            <div className="flex flex-col items-center w-56">
                <DailySidebar day={day} setday={setDay}/>
            </div>
        </section>
    )
}