import dayjs from "dayjs";
import { useState } from "react";
import { useResponsiveWidth } from '../hooks/WindowSize';
import YearlySidebar from "../components/YearlySidebar";
import YOKR from "../components/YOKR";
import MobileHeader from "../components/MobileHeader";
import YearlySidebarDrawer from "../components/YearlySidebarDrawer";


export default function Yearly() {
    const [day, setDay] = useState(dayjs().format("YYYY"))
    const { md } = useResponsiveWidth();

    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full md:max-w-[calc(100%-14rem)] sm:px-2">
                {!md && (
                    <MobileHeader >
                        <YearlySidebarDrawer day={day} setday={setDay}/>
                    </MobileHeader>
                )}
                <YOKR day={day} />
            </div>
            {md && (
                <div className="hidden md:block sticky top-0 left-0 w-56">
                    <YearlySidebar day={day} setday={setDay} />
                </div>
            )}
        </section>
    )
}