import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MenuList from "../pages/MenuList";
import RegisterUser from "../pages/RegisterUser";
import UserList from "../pages/UserList";
import CreateMenu from "../pages/CreateMenu";
import ViewMenu from "../pages/ViewMenu";

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
    },
    {
        path: "/create-menu",
        element: <CreateMenu/>
    },
    {
        path: "/users",
        element: <UserList/>
    },
    {
        path: "/view-menu/:date",
        element: <ViewMenu/>
    }

])

export default routes