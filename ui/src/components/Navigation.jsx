import { Typography } from "@mui/joy"
import { useNav } from "../hooks/nav"

export default function Navigation() {
    const gto = useNav()

    const items = [
        {
            to: "daily",
            title: "daily",
        },
        {
            to: "monthly",
            title: "monthly",
        },
    ]

    return (
        <header className="w-full h-full overflow-auto flex flex-col justify-start items-start py-4 z-30">
            <div className="w-full px-2 py-2 flex flex-col justify-start items-start shrink-0 space-y-2">
                {items.map(i =>
                    <Typography key={i.title} className={ "px-4 pr-5 py-2 rounded-2xl border flex flex-row items-center text-lg text-gray-800 dark:text-gray-300 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700" } 
                        onClick={() => gto(i.to)}
                    >
                        {i.title}
                    </Typography>
                )}
            </div>
        </header>
    )
}