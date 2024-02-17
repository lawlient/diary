import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/joy";
import DailySidebar from "./DailySidebar";
import { useDay } from "./DayContext";

export default function DailySidebarDrawer() {
    const {day} = useDay()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
    }, [day])

    return (
        <div>
            <IconButton onClick={() => {setOpen(true)}}>
                <Search />
            </IconButton>
            <Drawer anchor="right" size="sm" open={open} onClose={() => setOpen(false)}>
                <DailySidebar />
            </Drawer>
        </div> 

    )
}