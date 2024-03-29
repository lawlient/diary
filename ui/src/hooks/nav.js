import { useNavigate } from "react-router-dom"

export const useNav = () => {
    const nav = useNavigate()
    return (url) => {
        var BASEPATH = import.meta.env.BASE_URL
        console.log(url)
        nav(BASEPATH + url)
    }
}