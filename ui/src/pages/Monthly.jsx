import dayjs from "dayjs";
import { useState } from "react";
import { useResponsiveWidth } from '../hooks/WindowSize';
import MonthlyTitle from "../components/MonthlyTitle";
import MonthlySidebar from "../components/MonthlySidebar";
import MOKR from "../components/MOKR";
import MobileHeader from "../components/MobileHeader";
import MonthlySidebarDrawer from "../components/MonthlySidebarDrawer";


export default function Monthly() {
    const [day, setDay] = useState(dayjs().format("YYYY-MM"))
    const { md } = useResponsiveWidth();

    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full flex flex-col md:max-w-[calc(100%-14rem)] sm:px-2">
                {!md && (
                    <MobileHeader >
                        <MonthlySidebarDrawer day={day} setday={setDay}/>
                    </MobileHeader>
                )}
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