import { Box, Fab, Stack, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import "./styles.css"
import { ListTitleContainer } from "./styles";

export default function MenuList() {
    return (
        <>
            <NavBar/>
            <Stack bgcolor="#F8F4EB" padding={10}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <ListTitleContainer>
                        <Typography>Registered Menu List</Typography>
                    </ListTitleContainer>
                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={3}>
                        <Typography>Add new Menu</Typography>
                        <Fab color="inherit" aria-label="add">
                            Add
                        </Fab>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}