import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Drawer, IconButton } from "@mui/joy"
import { Menu } from "@mui/icons-material"
import Navigation from "./Navigation"




export default function NavigationDrawer() {
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setOpen(false)
    }, [location])


    return (
        <>
            <IconButton onClick={() => setOpen(true)} >
                <Menu />
            </IconButton>
            <Drawer anchor="left" size="sm" open={open} onClose={() => setOpen(false)} >
                <div className="w-full px-4">
                    <Navigation />
                </div>
            </Drawer>
            
        </>
    )
}