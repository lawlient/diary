import { Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import Diary from "../components/Diary";
import TaskTitle from "../components/TaskTitle";
import DiaryTitle from "../components/DiaryTitle";


export default function Daily() {
    const [day, setDay] = useState()


    return (
        <section className="flex w-full">
            <div className="flex flex-col items-center w-[calc(100%-14rem)]">
                <TaskTitle day={day} setday={setDay} />
                <DiaryTitle day={day} />
                <Diary day={day} />
            </div>
            <div className="flex flex-col items-center w-56">

            </div>
        </section>
    )
}