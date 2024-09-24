import { Box, Fab, Stack, Typography } from "@mui/material";
import RestaurantForm from "./components/RestaurantForm";

export default function CreateMenu() {
    return (
        <>
            <Stack flexDirection={"row"} alignItems={"center"} minHeight={"100vh"} justifyContent={"space-around"} gap={2}>
                <Stack>
                    <RestaurantForm></RestaurantForm>
                </Stack>
                <Stack flexDirection={"row"}>
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
        </>
    )
}