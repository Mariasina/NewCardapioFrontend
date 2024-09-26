import { Box, Fab, Grid2 as Grid, Stack, Typography } from "@mui/material";
import RestaurantForm from "./components/RestaurantForm";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api";

export type Restaurant = {
    id: string,
    name: string,
    description: string,
    dishes: Dish[]
}

export interface Dish {
    id: string,
    name: string,
    ingredients: Ingredient[]
}

export type Ingredient = {
    id: string,
    name: string,
    hasGluten: boolean,
    isAnimal: boolean,
    isMeat: boolean
}

type RestaurantResponse = {
    message: string,
    restaurants: Restaurant[]
}



export default function CreateMenu() {



    const [dbRestaurants, setDbRestaurants] = useState<Restaurant[]>([])
    const [localRestaurants, setLocalRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        (async () => {
            const res = api.get<Restaurant[]>("/restaurant", getAuth())
        })()
    });



    const title = document.getElementById("page-title")

    return (
        <>
            <Stack
                flexDirection={"row"}
                alignItems={"center"}
                minHeight={"100vh"}
                justifyContent={"space-around"}
                gap={2}
                padding={10}
               
            >
                <Grid container spacing={10}  width={"100%"}>
                    <Grid size={{xs: 12, md: 6, lg: 4}}>
                        <RestaurantForm></RestaurantForm>
                    </Grid>
                   
                </Grid>

                <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={3}
                    position={"fixed"}
                    top={"3%"} right={"3%"}
                >
                    <Typography>Add new Restaurant</Typography>
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