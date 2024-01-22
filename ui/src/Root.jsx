import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Root() {
    const [doc, setDoc] = useState("")

    useEffect(() => {
        var HOSTNAME = import.meta.env.VITE_BASE_URL
        var BASEPATH = import.meta.env.BASE_URL
        axios.defaults.baseURL = HOSTNAME + BASEPATH
        axios.get("/").then(res => {
            if (res.data.success) {
                setDoc(res.data.data)
            } else {
                alert(res.data.msg)
            }
        })

    }, [])


    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className="w-110 h-300 mx-auto my-auto">
                <div className='flex flex-col items-center justify-center mb-10'>
                    <h1 className="text-4xl"> Welcome </h1>
                </div>
                <div>
                    <p>Read <a className='underline ' href={doc} >Document</a> to learn how to use .</p>
                </div>
            </div>
        </div>
    )
}