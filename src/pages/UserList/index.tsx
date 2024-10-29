/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fab, Stack, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import UserCard from "./components/UserCard";
import AnimatedTitle from "../../components/AnimatedTitle";
import { CardContainer } from "./styles";
import CustomPagination from "../../components/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api";
import { useJwt } from "react-jwt";
import { DefaultResponse } from "../../types";
import { AxiosError } from "axios";
import { JwtPayload } from "../../utils/jwt.utils";

export type UserInfo = {
    username: string,
    isAdmin: boolean
}

type UserResponseType = {
    message: string,
    users: UserInfo[]
}

function UserList() {
    document.title = "Usuários"

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { decodedToken, isExpired } = useJwt<JwtPayload>(token ?? "")

    const [users, setUsers] = useState<any[]>([])

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
            const res = await api.get<UserResponseType>("/users", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message)
            })
            if (!res) {
                return
            }
            setUsers(res.data.users)
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
                        <AnimatedTitle title={"Usuários registrados"} />
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Adicionar Usuário</Typography>
                            <Link to={"/register-user"} style={{
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
                            {users.map((item, index) => 
                                <UserCard key={index} userInfo={item}/>
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

export default UserList;