import { Typography } from "@mui/material";
import { UserBox } from "./styles";

export default function UserCard() {
    return (
        <>
            <UserBox>
                <Typography fontFamily={"Marcellus"} variant="h5">Username</Typography>
            </UserBox>
        </>
    )
}