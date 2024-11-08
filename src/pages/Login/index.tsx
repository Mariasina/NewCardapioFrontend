import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { GreenPanel, LoginImage } from "./styles";
import LoginImg from "../../assets/img/login_img.svg";
import { useState } from "react";
import { api } from "../../api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { DefaultResponse } from "../../types";

export default function Login() {
    document.title = "Login"

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await api.post("/login", {
            username,
            password
        }).catch((err: AxiosError<DefaultResponse>) => {
            alert(err.response?.data.message)
        })

        if (!res) {
            return
        }

        if(res.status == 200){
            localStorage.setItem("token", res.data.token)
            navigate("/")
        }
    }

    return (
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
                    }}
                    zIndex={10}
                >
                    <Typography fontFamily={"Marcellus SC"} variant="h2" color="white" mt={5} textAlign={"center"} zIndex={9}>
                        Login
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack width={"100%"} gap={5} mt={10} alignItems={"center"}>
                            <TextField
                                label="Username"
                                sx={{
                                    backgroundColor: "#ffffffe8",
                                    ".MuiFilledInput-root, &": {
                                        borderTopRightRadius: "8px",
                                        borderTopLeftRadius: "8px",
                                        fontFamily: "Marcellus",
                                        fontSize: "1.1rem"
                                    },
                                    ".MuiFormLabel-root": {
                                        fontFamily: "Marcellus",
                                        fontWeight: "600"
                                    }
                                }}
                                variant="filled"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Adicionando onChange
                            />
                            <TextField
                                type="password"
                                label="Password"
                                variant="filled"
                                sx={{
                                    backgroundColor: "#ffffffe8",
                                    ".MuiFilledInput-root, &": {
                                        borderTopRightRadius: "8px",
                                        borderTopLeftRadius: "8px",
                                        fontFamily: "Marcellus",
                                        fontSize: "1.1rem"
                                    },
                                    ".MuiFormLabel-root": {
                                        fontFamily: "Marcellus",
                                        fontWeight: "600"
                                    }
                                }}
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            <Button
                                type="submit" 
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
                                <Typography sx={{ textTransform: "capitalize" }} fontFamily={"Marcellus"} variant="h5" textAlign={"center"}>Login</Typography>
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </GreenPanel>
            <Box>
                <LoginImage src={LoginImg}></LoginImage>
            </Box>
        </Stack>
    );
}
