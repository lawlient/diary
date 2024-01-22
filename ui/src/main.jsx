import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"
import App from './App.jsx'
import Root from './Root.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
    {
        path: import.meta.env.BASE_URL,
        element: <App />,
        children: [
            {
                path: "",
                element: <Root />,
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)