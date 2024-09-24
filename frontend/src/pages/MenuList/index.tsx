import { Box, Fab, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import { CardContainer, ListTitleContainer } from "./styles";
import MenuCard from "./components/MenuCard";
import CustomPagination from "../../components/CustomPagination";

export default function MenuList() {
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
                        <ListTitleContainer>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Registered Menu List</Typography>
                        </ListTitleContainer>
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>Add new Menu</Typography>
                            <Fab color="inherit" sx={{
                                backgroundColor: "#CCA67F",

                                ":hover": {
                                    backgroundColor: "#dec4ab",
                                }

                            }} aria-label="add">
                                <span className="material-symbols-outlined">add</span>
                            </Fab>
                        </Stack>
                    </Stack>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <CardContainer>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            <Stack alignItems={"center"} gap={"10px"}>
                                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>15/02/2024</Typography>
                                <MenuCard />
                            </Stack>
                            
                        </CardContainer>
                    </Stack>
                </Stack>
            </Stack>
            <Stack alignItems={"center"}>

                <CustomPagination pages={2}/>
            </Stack>
        </>
    )
}