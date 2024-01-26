import { useState } from "react"
import { Input, Button, Typography, Link, Avatar } from '@mui/joy'
import { signin } from "../api/api.js"

import { useNav } from "../hooks/nav"
import axios from "axios"


export default function Signin() {
    const [info, setInfo] = useState({
        "username": "",
        "password": "",
    })
    const gto = useNav()

    const login = (e) => {
        e.preventDefault()
        signin(info).then(res => {
            if (res.data.success) {
                console.log("token is ", res.data.token)
                localStorage.setItem("__token__", res.data.token)
                axios.defaults.headers["Authorization"] = localStorage.getItem("__token__")
                gto("")
            } else {
                console.log("error is ", res.data.msg)
            }
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="px-8 py-16 flex flex-col w-300 h-auto justify-center gap-3 border-solid border border-black rounded-lg" onSubmit={e => login(e)}>
                <Avatar sx={{}} src={""} />
                <Input type="text" autoFocus required value={info.username} onChange={(e) => setInfo({...info, username: e.target.value}) } placeholder="username" />
                <Input type="password" required value={info.password} onChange={(e) => setInfo({...info, password: e.target.value}) } placeholder="password" />
                <Button type="submit" >Login</Button>
                <Typography endDecorator={<Link href="signup">Signup</Link>} >Don't have an account ?</Typography>
            </form>
        </div>
    )
}