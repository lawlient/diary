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
        {
            to: "yearly",
            title: "yearly",
        },
    ]

    return (
        <header className="w-full h-full overflow-auto flex flex-col justify-start items-start py-4 z-30">
            <div className="w-full px-4 py-2 flex flex-col justify-start items-start shrink-0 space-y-2 hover:cursor-pointer">
                {items.map(i =>
                    <span key={i.title} 
                    className={ "px-5 py-2 rounded-3xl border flex flex-row items-center text-xl text-gray-800 dark:text-gray-300 hover:bg-white hover:border-gray-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700" } 
                        onClick={() => gto(i.to)}
                    >
                        {i.title}
                    </span>
                )}
            </div>
        </header>
    )
}