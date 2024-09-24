import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { MainPanel, PicturePanel, RegisterImg } from "./styles";
import registerImg from "../../assets/img/register-user-img.png"

function RegisterUser() {
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

                            />
                            <TextField
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
                            />
                            <Box sx={{
                                width: "100%",
                                ".MuiCheckbox-root.Mui-checked": {
                                    color: "var(--bg-primary)"
                                }
                            }}>
                                <FormControlLabel control={<Checkbox />} label="Admin" sx={{ ".MuiTypography-root": { fontFamily: "Marcellus" } }} />
                            </Box>

                            <Button

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