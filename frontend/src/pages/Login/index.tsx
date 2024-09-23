import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { GreenPanel, LoginImage } from "./styles";
import LoginImg from "../../assets/img/loginImg.svg"

export default function Login() {
    return (
        <>
            <Stack flexDirection={"row"} height={"100vh"}>
                <GreenPanel>
                    <Stack
                        height={"100%"}
                        width={"75%"}
                        my={5}
                        sx={{
                            backgroundColor: "var(--bg-primary)",
                            padding: 5,
                            borderRadius: "20px",
                            // boxShadow: "4px 4px 15px 10px #44444461"
                        }} 
                        zIndex={10}
                    >
                        <Typography variant="h2" color="white" mt={5} textAlign={"center"} zIndex={9}>Login</Typography>

                        <Stack width={"100%"} gap={10} mt={15}  alignItems={"center"} >
                            <TextField
                                label="Username"
                                sx={{
                                    backgroundColor: "#ffffffe8",
                                    ".MuiFilledInput-root, &": {
                                        borderTopRightRadius: "8px",
                                        borderTopLeftRadius: "8px"
                                    }
                                }}
                                variant="filled"
                                fullWidth
                                 
                            />
                            <TextField
                                label="Password"
                                variant="filled"
                                sx={{
                                    backgroundColor: "#ffffffe8",
                                    ".MuiFilledInput-root, &": {
                                        borderTopRightRadius: "8px",
                                        borderTopLeftRadius: "8px"
                                    }
                                }}
                                fullWidth
                            />
                            <Button

                                variant="contained"
                                fullWidth
                                sx={{
                                    maxWidth: "350px",
                                    padding: 3,
                                    backgroundColor: "#CCA67F",
                                    color: "var(--bg-primary)"
                                }}
                                color="inherit"
                            >
                                <Typography variant="h5">Login</Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </GreenPanel>
                <Box>
                    <LoginImage src={LoginImg}></LoginImage>
                </Box>
            </Stack>
        </>
    )
}