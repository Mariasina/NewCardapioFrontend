import { Box, Typography } from "@mui/material";
import { UserBox } from "./styles";
import user from "../../../../assets/img/user-icon.png"

export default function UserCard() {
    return (
        <>
            <UserBox>
                <img width={"70px"} src={user}></img>
                <Box>
                    <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Username</Typography>
                    <Typography fontFamily={"Marcellus"} fontSize={"0.8rem"}>Admin</Typography>
                </Box>
            </UserBox>
        </>
    )
}