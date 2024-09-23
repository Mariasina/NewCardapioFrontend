import { Box, Fab, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import "./styles.css"
import { CardContainer, ListTitleContainer } from "./styles";
import MenuCard from "./components/MenuCard";

export default function MenuList() {
    return (
        <>
            <NavBar/>
            <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} pt={10}>
                <Stack bgcolor="#F8F4EB" sx={{width: "90%", maxWidth: "1000px"}}>
                    <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
                        "@media screen and (max-width: 425px)": {
                            flexDirection: "column-reverse",
                            gap: "30px"
                        }
                    }}>
                        <ListTitleContainer>
                            <Typography>Registered Menu List</Typography>
                        </ListTitleContainer>
                        <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={2}>
                            <Typography>Add new Menu</Typography>
                            <Fab color="inherit" sx={{
                                backgroundColor:"#CCA67F",

                                ":hover": {
                                    backgroundColor:"#dec4ab",
                                }

                            }} aria-label="add">
                                <span className="material-symbols-outlined">add</span>
                            </Fab>
                        </Stack>
                    </Stack>
                    <Stack alignItems={"center"} justifyContent={"center"}>
                        <CardContainer>
                            <MenuCard/>
                            <MenuCard/>
                            <MenuCard/>
                            <MenuCard/>
                            <MenuCard/>
                            <MenuCard/>
                            <MenuCard/>
                        </CardContainer>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}