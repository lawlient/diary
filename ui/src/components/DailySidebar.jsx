import Heatmap from "./Heatmap";

export default function DailySidebar({day, setday}) {
    return (
        <div className="flex flex-col items-center gap-3">
            <Heatmap day={day} setday={setday}/>
        </div>
    )
}