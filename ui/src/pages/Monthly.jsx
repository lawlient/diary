import dayjs from "dayjs";
import MonthlyTitle from "../components/MonthlyTitle";
import { useState } from "react";
import MonthlySidebar from "../components/MonthlySidebar";
import MOKR from "../components/MOKR";


export default function Monthly() {
    const [day, setDay] = useState(dayjs().format("YYYY-MM"))

    return (
        <section className="flex w-full">
            <div className="flex flex-col items-center w-[calc(100%-14rem)]">
                <MonthlyTitle day={day} setday={setDay} />
                <MOKR day={day} />
            </div>
            <div className="w-56">
                <MonthlySidebar day={day} setday={setDay} />
            </div>
        </section>
    )
}