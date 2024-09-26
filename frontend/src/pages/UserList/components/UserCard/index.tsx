import { Box, Typography } from "@mui/material";
import { UserBox } from "./styles";
import user from "../../../../assets/img/user-icon.png"
import { useEffect } from "react";
import { api, getAuth } from "../../../../api";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../../../types";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../..";

type UserCardProps = {
    userInfo: UserInfo
}

export default function UserCard({userInfo}: UserCardProps) {

    return (
        <>
            <UserBox>
                <img width={"70px"} src={user}></img>
                <Box>
                    <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{userInfo.username}</Typography>
                    <Typography fontFamily={"Marcellus"} fontSize={"0.8rem"}>{userInfo.isAdmin ? "Admin" :  "User"}</Typography>
                </Box>
            </UserBox>
        </>
    )
}