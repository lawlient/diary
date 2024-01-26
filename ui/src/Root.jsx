import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function Root() {
    return (
        <div className='flex items-center justify-center h-screen bg-zinc-100'>
            <div className="w-full max-w-6xl mx-auto flex flex-row justify-center items-start sm:px-4">
                <div className="sm:block sticky top-0 left-0 w-56">
                    <Navigation />
                </div>
                <main className="w-full min-h-screen sm:max-w-[calc(100%-14rem)] flex-grow shrink flex flex-col justify-start items-start">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}