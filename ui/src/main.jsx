import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./index.css"
import "./less/code-highlight.less"
import App from './App.jsx'
import Root from './Root.jsx'
import NotFound from './pages/NotFound.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Daily from './pages/Daily.jsx';
import Monthly from './pages/Monthly.jsx';
import Yearly from './pages/Yearly.jsx';
import { getuser } from './api/api.js';

// loader, must return something
const init_user = async () => {
    var username = localStorage.getItem("__username__")
    if (username == null || username === "") {
        redirect(import.meta.env.BASE_URL + "signin")
        return null
    }
    console.log("Welcome to yraid")
    await getuser(username).then(res => {
        console.log(res.data)
    })
    return null
}

const router = createBrowserRouter([
    {
        path: import.meta.env.BASE_URL,
        element: <App />,
        children: [
            {
                path: "",
                element: <Root />,
                loader: () => init_user(),
                children: [
                    {
                        path: "",
                        element: <Daily />,
                    },
                    {
                        path: "daily",
                        element: <Daily />,
                    },
                    {
                        path: "monthly",
                        element: <Monthly />,
                    },
                    {
                        path: "yearly",
                        element: <Yearly />,
                    },
                ]
            },
            {
                path: "*",
                element: <NotFound />
            },
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "signup",
                element: <Signup />
            },
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)