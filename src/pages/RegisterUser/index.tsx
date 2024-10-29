import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { MainPanel, PicturePanel, RegisterImg } from "./styles";
import registerImg from "../../assets/img/register-user-img.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../api";
import { AxiosError } from "axios";
import { useJwt } from "react-jwt";
import { JwtPayload } from "../../utils/jwt.utils";

function RegisterUser() {
    document.title = "Criar novo usuário"

    const navigate = useNavigate()
    const { decodedToken, isExpired } = useJwt<JwtPayload>(localStorage.getItem("token")!)

    if (isExpired || !localStorage.getItem("token")) {
        localStorage.removeItem("token")
        navigate("/login")
    }

    if (decodedToken) {
        if (decodedToken.isAdmin == false)
            navigate("/")
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await api.post("/createAdmin", {
            username,
            password,
            isAdmin
        }).catch((err: AxiosError) => {
            console.log(err.message)
            alert(err.message)
        })

        if (!res) {
            return
        }

        if (res.status == 200)
            navigate("/")

    }

    return (
        <>
            <Stack flexDirection={"row"} minHeight={"100vh"}>
                <MainPanel>
                    <Stack
                        height={"100%"}
                        width={"75%"}
                        my={5}
                        sx={{
                            padding: 5,
                            borderRadius: "20px",
                        }}
                        zIndex={10}
                    >
                        <Typography fontFamily={"Marcellus SC"} variant="h2" color="white" mt={5} textAlign={"center"} zIndex={9}>Criar novo usuário</Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack width={"100%"} gap={10} mt={15} alignItems={"center"} >
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
                                    onChange={(e) => setUsername(e.target.value)}

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
                                <Box sx={{
                                    width: "100%",
                                    ".MuiCheckbox-root.Mui-checked": {
                                        color: "var(--bg-primary)"
                                    }
                                }}>
                                    <FormControlLabel control={<Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />} label="Admin" sx={{ ".MuiTypography-root": { fontFamily: "Marcellus" } }} />
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        maxWidth: "350px",
                                        padding: 3,
                                        backgroundColor: "var(--bg-primary)",
                                        color: "white"
                                    }}
                                    color="inherit"
                                >
                                    <Typography sx={{ textTransform: "capitalize" }} fontFamily={"Marcellus"} variant="h5">Cadastrar</Typography>
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </MainPanel>
                <PicturePanel>
                    <RegisterImg src={registerImg}></RegisterImg>
                </PicturePanel>
            </Stack>
        </>
    )
}

export default RegisterUser;