import { useEffect, useState } from "react";
import { Drawer, IconButton } from "@mui/joy";
import { Search } from "@mui/icons-material";
import MonthlySidebar from "./MonthlySidebar";


export default function MonthlySidebarDrawer({day, setday}) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(false)
    }, [day])

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <Search />
            </IconButton>
            <Drawer anchor="right" size="sm" open={open} onClose={() => setOpen(false)}>
                <MonthlySidebar day={day} setday={setday} />
            </Drawer>
        </div>

    )
}