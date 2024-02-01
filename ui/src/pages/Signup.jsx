import { useState } from "react"
import { Input, Button, Typography, Link, Avatar, Snackbar } from '@mui/joy'
import { signup } from "../api/api.js"
import { useNav } from "../hooks/nav"



export default function Signin() {
    const [info, setInfo] = useState({
        "username": "",
        "password": "",
    })
    const [feedback, setFeedback] = useState({
        open: false,
        msg: "",
        duration: 3000,
        color: 'success'
    })
    const [logo, setLogo] = useState(import.meta.env.BASE_URL + "logo.png")
    const resetFeedback = () => {
        setFeedback({
            open: false,
            msg: "",
            duration: 3000,
            color: 'success'
        })
    }
    const gto = useNav()
    const register = (e) => {
        e.preventDefault()
        signup(info).then(res => {
            if (res.data.success) {
                console.log("token is ", res.data.token)
                localStorage.setItem("__token__", res.data.token)
                localStorage.setItem("__username__", info.username)
                gto("")
            } else {
                setFeedback({
                    open: true,
                    msg: res.data.msg,
                    duration: 5000,
                    color: 'danger',
                })
            }
        })
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="px-8 py-8 flex flex-col w-300 h-auto justify-center items-center gap-3 border-solid border border-gray-400 rounded-lg shadow-2xl shadow-gray-400" onSubmit={e => register(e)}>
                <Avatar size="xl" variant="outlined" src={logo} />
                <Input type="text" autoFocus fullWidth required value={info.username} onChange={(e) => setInfo({...info, username: e.target.value}) } placeholder="username" />
                <Input type="password" fullWidth required value={info.password} onChange={(e) => setInfo({...info, password: e.target.value}) } placeholder="password" />
                <Button type="submit" fullWidth >Signup</Button>
                <Typography endDecorator={<Link href="signin">Login</Link>} >Already have an account ?</Typography>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal:'center'}} open={feedback.open} 
                    onClose={resetFeedback} autoHideDuration={feedback.duration} color={feedback.color} >
                        {feedback.msg}
                </Snackbar>
            </form>
        </div>
    )
}