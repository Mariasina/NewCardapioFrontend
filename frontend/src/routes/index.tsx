import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MenuList from "../pages/MenuList";
import RegisterUser from "../pages/RegisterUser";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/menus",
        element: <MenuList/>
    },
    {
        path: "/register-user",
        element: <RegisterUser/>
    }

])

export default routes