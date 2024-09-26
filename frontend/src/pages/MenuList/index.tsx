import { Fab, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import { CardContainer } from "./styles";
import MenuCard from "./components/MenuCard";
import CustomPagination from "../../components/CustomPagination";
import AnimatedTitle from "../../components/AnimatedTitle";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";

export type MenuInfo = {
    date: Date
}

type MenuResponseType = {
    message: string,
    menus: MenuInfo[]
}

export default function MenuList() {
    document.title = "Cardápios"

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt<any>(token ?? "")

    const [menus, setMenus] = useState<any[]>([])

    if (isExpired || !token) {
        localStorage.removeItem("token")
        navigate("/login")
    }

    if (decodedToken) {
        if (decodedToken.isAdmin == false)
            navigate("/")
    }

    useEffect(() => {
        (async () => {
            const res = await api.get<MenuResponseType>("/menu", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message)
            })
            if (!res) {
                return
            }
            setMenus(res.data.menus)
        })()
    });

    return (
        <>
            <NavBar />
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} pt={10}>
                <Stack bgcolor="#F8F4EB" sx={{ width: "90%", maxWidth: "1000px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
                        "@media screen and (max-width: 425px)": {
                            flexDirection: "column-reverse",
                            gap: "30px"
                        }
                    }}>
                        <AnimatedTitle title={"Registered Menus"} />
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Add new Menu</Typography>
                            <Link to={"/create-menu"} style={{
                                textDecoration: "none",
                                color: "black"
                            }}>
                                <Fab color="inherit" sx={{
                                    backgroundColor: "#CCA67F",

                                    ":hover": {
                                        backgroundColor: "#dec4ab",
                                    }

                                }} aria-label="add">
                                    <span className="material-symbols-outlined">add</span>
                                </Fab>
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <CardContainer>
                            {menus.map((item, index) =>

                                <Stack alignItems={"center"} gap={"10px"}>
                                    <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{item.date}</Typography>
                                    <MenuCard key={index} />
                                </Stack>
                            )}
                            

                        </CardContainer>
                    </Stack>
                </Stack>
            </Stack>
            <Stack alignItems={"center"}>

                <CustomPagination pages={2} />
            </Stack>
        </>
    )
}