import { Box,  Stack, Typography } from "@mui/material";
import { GreenPanel, LoginImage } from "./styles";
import LoginImg from "../../assets/img/loginImg.svg"

export default function Login() {
    return (
        <>
            <Stack flexDirection={"row"} height={"100vh"}>
                <GreenPanel>
                    <Box>
                        <Typography>Login</Typography>
                    </Box>
                </GreenPanel>
                <Box>
                    <LoginImage src={LoginImg}></LoginImage>
                </Box>
            </Stack>
        </>
    )
}