/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fab, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { CardContainer } from "./styles";
import MenuCard from "./components/MenuCard";
import CustomPagination from "../../components/CustomPagination";
import AnimatedTitle from "../../components/AnimatedTitle";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api/index.ts";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";
import { JwtPayload } from "../../utils/jwt.utils";

export type MenuInfo = {
    date: Date
}

type MenuResponseType = {
    message: string,
    menus: MenuInfo[]
}

const formatDate = (data: Date) => ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear() 

export default function MenuList() {
    document.title = "Cardápios"

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { isExpired } = useJwt<JwtPayload>(token ?? "")

    const [menus, setMenus] = useState<any[]>([])

    if (isExpired || !token) {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        (async () => {
            const res = await api.get<MenuResponseType>("/menu", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message)
            })
            if (!res) {
                return
            }

            const menus = res.data.menus.map((m) => {return {...m, date: new Date(m.date)}})

            setMenus(menus)
        })()
    });

    return (
        <>
            <Navbar />
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} pt={10}>
                <Stack bgcolor="#F8F4EB" sx={{ width: "90%", maxWidth: "1000px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
                        "@media screen and (max-width: 425px)": {
                            flexDirection: "column-reverse",
                            gap: "30px"
                        }
                    }}>
                        <AnimatedTitle title={"Cardápios cadastrados"} />
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Adicionar Cardápio</Typography>
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
                                    <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{formatDate(item.date)}</Typography>
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