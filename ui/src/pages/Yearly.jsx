import dayjs from "dayjs";
import { useState } from "react";
import { useResponsiveWidth } from '../hooks/WindowSize';
import YOKR from "../components/YOKR";
import MobileHeader from "../components/MobileHeader";
import YearlySidebarDrawer from "../components/YearlySidebarDrawer";
import YearlyTitle from "../components/YearlyTitle";


export default function Yearly() {
    const [day, setDay] = useState(dayjs().format("YYYY"))
    const { md } = useResponsiveWidth();

    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full sm:px-2">
                {!md && (
                    <MobileHeader >
                        <YearlySidebarDrawer day={day} setday={setDay}/>
                    </MobileHeader>
                )}
                <YearlyTitle day={day} setday={setDay} />
                <YOKR day={day} />
            </div>
        </section>
    )
}