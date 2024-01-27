import dayjs from "dayjs";
import MonthlyTitle from "../components/MonthlyTitle";
import { useState } from "react";
import MonthlySidebar from "../components/MonthlySidebar";
import MOKR from "../components/MOKR";
import { useResponsiveWidth } from '../hooks/WindowSize';


export default function Monthly() {
    const [day, setDay] = useState(dayjs().format("YYYY-MM"))
    const { md } = useResponsiveWidth();

    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full px-4 md:max-w-[calc(100%-14rem)] sm:px-2 sm:pt-4">
                <MonthlyTitle day={day} setday={setDay} />
                <MOKR day={day} />
            </div>
            {md && (
                <div className="hidden md:block sticky top-0 left-0 w-56">
                    <MonthlySidebar day={day} setday={setDay} />
                </div>
            )}
        </section>
    )
}