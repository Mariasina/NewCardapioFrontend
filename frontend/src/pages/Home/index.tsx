import { useJwt } from "react-jwt";
import CustomPagination from "../../components/CustomPagination";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AnimatedTitle from "../../components/AnimatedTitle";

export default function Home() {
    document.title = "Home"

    const navigate = useNavigate()
    const { decodedToken, isExpired } = useJwt<any>(localStorage.getItem("token")!)

    if (isExpired || !localStorage.getItem("token")) {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <>
            <NavBar />
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} pt={10}>
                <Stack bgcolor="#F8F4EB" sx={{ width: "90%", maxWidth: "1000px" }}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
                        "@media screen and (max-width: 425px)": {
                            flexDirection: "column-reverse",
                            gap: "30px"
                        }
                    }}>
                        <AnimatedTitle title={"Cardápio de hoje"} />
                    </Stack>
                </Stack>
                <Stack flexDirection={"column"} width={"100%"} padding={"30px"}>
                    <Box sx={{ border: "7px solid #0C482E", height: "600px", width: "100%", borderRadius: "10px" }}>

                    </Box>
                </Stack>
            </Stack>
        </>
    )
}