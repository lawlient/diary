import dayjs from 'dayjs'
import { useState } from 'react';

import Diary from "../components/Diary";
import TaskTitle from "../components/TaskTitle";
import DiaryTitle from "../components/DiaryTitle";
import DailySidebar from "../components/DailySidebar";
import { useResponsiveWidth } from '../hooks/WindowSize';
import DailySidebarDrawer from '../components/DailySidebarDrawer';
import MobileHeader from '../components/MobileHeader';


export default function Daily() {
    const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"))
    const { md } = useResponsiveWidth()


    return (
        <section className="w-full flex flex-row justify-start items-start">
            <div className="w-full flex flex-col md:w-[calc(100%-14rem)]">
                {!md && (
                    <MobileHeader >
                        <DailySidebarDrawer day={day} setday={setDay}/>
                    </MobileHeader>
                )}
                <TaskTitle day={day} setday={setDay} />
                <DiaryTitle day={day} />
                <Diary day={day} />
            </div>
            { md && (
                <div className="flex flex-col items-center w-56">
                    <DailySidebar day={day} setday={setDay}/>
                </div>
            )}
        </section>
    )
}