import { useEffect, useState } from "react"
import { useNav } from "../hooks/nav"
import { getuser } from "../api/api"
import { Avatar } from "@mui/joy"
import { CalendarMonth, PlaceOutlined, Settings, Today } from "@mui/icons-material"

export default function Navigation() {
    const gto = useNav()

    const items = [
        {
            to: "daily",
            title: "daily",
            icon: <Today />,
        },
        {
            to: "monthly",
            title: "monthly",
            icon: <CalendarMonth />,
        },
        {
            to: "yearly",
            title: "yearly",
            icon: <PlaceOutlined />,
        },
        {
            to: "setting",
            title: "setting",
            icon: <Settings />,
        }
    ]

    const [index, setIndex] = useState(0)
    useEffect(() => {
        for (var i = 0; i < items.length; i++) {
            if (window.location.href.endsWith(items[i].to)) {
                setIndex(i)
                return
            }
        }
        setIndex(0)
    }, [window.location.href])

    const [user, setUser] = useState({
        username: localStorage.getItem("__username__"),
        avatar: localStorage.getItem("__avatar__") && "logo.png",
    })

    return (
        <header className="w-full h-full overflow-auto flex flex-col justify-start items-start py-4 z-30">
            <div className="w-full px-4 py-2 flex flex-col justify-start items-start shrink-0 space-y-2 hover:cursor-pointer">
                <div className={ `px-5 py-2 flex flex-row items-center gap-2 text-xl text-gray-800 dark:text-gray-300 hover:bg-white hover:rounded-xl hover:border-gray-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700` } >
                    <Avatar src={user.avatar} variant="solid" size="sm"/>
                    {user.username}
                </div>
                {items.map((en, i) =>
                    <span key={i} 
                    className={ `px-5 py-2 rounded-3xl flex flex-row gap-2 items-center text-xl text-gray-800 ${index === i && 'bg-white border '} dark:text-gray-300 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700` } 
                        onClick={() => {
                            gto(en.to)
                            setIndex(i)
                        }
                    }>
                        {en.icon}
                        {en.title}
                    </span>
                )}
            </div>
        </header>
    )
}