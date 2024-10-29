import { Box, Typography } from "@mui/material";
import { UserBox } from "./styles";
import user from "../../../../assets/img/user-icon.png"
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