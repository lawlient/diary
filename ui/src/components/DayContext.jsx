import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";


const DayContext = createContext();

const useDay = () => {
    const ctx = useContext(DayContext)

    if (ctx === undefined) {
        throw new Error('useDay must be used within a DayProvider')
    }
    return ctx
}

const DayProvider = props => {
    const [day, setDay] = useState(dayjs().format("YYYY-MM-DD"))

    const setday = (day) => {
        setDay(dayjs(day).format("YYYY-MM-DD"))
    }

    return (
        <DayContext.Provider value={[ day, setday]} {...props}>
            {props.children}
        </DayContext.Provider>
    )
}



export { useDay, DayProvider }