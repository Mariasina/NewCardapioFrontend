import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login"
    },
    {
        path: "/register"
    }

])

export default routes