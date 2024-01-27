import { useState } from "react"
import { Input, Button, Typography, Link, Avatar } from '@mui/joy'
import { signup } from "../api/api.js"
import { useNav } from "../hooks/nav"



export default function Signin() {
    const [info, setInfo] = useState({
        "username": "",
        "password": "",
    })
    const gto = useNav()
    const register = (e) => {
        e.preventDefault()
        signup(info).then(res => {
            if (res.data.success) {
                console.log("token is ", res.data.token)
                localStorage.setItem("__token__", res.data.token)
                gto("")
            } else {
                console.log("err is ", res.data.msg)
            }
        })
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="px-8 py-16 flex flex-col w-300 h-auto justify-center gap-3 border-solid border border-gray-400 rounded-lg shadow-2xl shadow-gray-400" onSubmit={e => register(e)}>
                <Avatar sx={{}} src={""} />
                <Input type="text" autoFocus required value={info.username} onChange={(e) => setInfo({...info, username: e.target.value}) } placeholder="username" />
                <Input type="password" required value={info.password} onChange={(e) => setInfo({...info, password: e.target.value}) } placeholder="password" />
                <Button type="submit" >Signup</Button>
                <Typography endDecorator={<Link href="signin">Login</Link>} >Already have an account ?</Typography>
            </form>
        </div>
    )
}