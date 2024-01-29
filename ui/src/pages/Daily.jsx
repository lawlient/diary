import Diary from "../components/Diary";
import TaskTitle from "../components/TaskTitle";
import DiaryTitle from "../components/DiaryTitle";
import DailySidebar from "../components/DailySidebar";
import { useResponsiveWidth } from '../hooks/WindowSize';
import DailySidebarDrawer from '../components/DailySidebarDrawer';
import MobileHeader from '../components/MobileHeader';
import TaskList from '../components/TaskList';
import { DayProvider } from "../components/DayContext";
import { TaskEditProvider } from "../components/TaskEditContext";

export default function Daily() {
    const { md } = useResponsiveWidth()


    return (
        <section className="w-full flex flex-row justify-start items-start">
        <DayProvider>
            <TaskEditProvider>
            <div className="w-full flex flex-col md:w-[calc(100%-14rem)]">
                {!md && (
                    <MobileHeader >
                        <DailySidebarDrawer />
                    </MobileHeader>
                )}
                <TaskTitle />
                <TaskList />
                <DiaryTitle />
                <Diary />
            </div>
            { md && (
                <div className="flex flex-col items-center w-56">
                    <DailySidebar />
                </div>
            )}
            </TaskEditProvider>
        </DayProvider>
        </section>
    )
}