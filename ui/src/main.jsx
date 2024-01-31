import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const init_user = () => {

}

const router = createBrowserRouter([
    {
        path: import.meta.env.BASE_URL,
        element: <App />,
        children: [
            {
                path: "",
                element: <Root />,
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