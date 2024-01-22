import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

export default function App() {
    useEffect(() => {
        console.log("Welcome to yraid")
    }, [])

    return (
        <Outlet />
    )
}
