import { Box, Fab, Grid2 as Grid, Stack, Typography } from "@mui/material";
import RestaurantForm from "./components/RestaurantForm";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";
import { JwtPayload } from "../../utils/jwt.utils";

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

type DishResponse = {
    message: string,
    dishes: Dish[]
}

type IngredientResponse = {
    message: string,
    ingredients: Ingredient[]
}

export default function CreateMenu() {
    const token = localStorage.getItem("token")

    const { isExpired } = useJwt<JwtPayload>(token ?? "")

    const navigate = useNavigate()

    if (isExpired || !token) {
        localStorage.removeItem("token")
        navigate("/login")
    }


    const [dbIngredients, setDbIngredients] = useState<Ingredient[]>([])
    const [localIngredients, setLocalIngredients] = useState<Ingredient[]>([])

    const [dbDishes, setDbDishes] = useState<Dish[]>([])
    const [localDishes, setLocalDishes] = useState<Dish[]>([])

    const [localRestaurants, setLocalRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        (async () => {
            const res = await api.get<DishResponse>("/dish", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message)
            })
            
            if (!res) {
                return
            }

            setDbDishes(res.data.dishes)
        })()

        
    }, []);

    useEffect(() => {
        (async () => {
            const res = await api.get<IngredientResponse>("/ingredient", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                alert(err.response?.data.message)
            })

            if (!res) {
                return
            }

            setDbIngredients(res.data.ingredients)
        })()
    }, [])

    const handleAddRestaurant = () => {
        setLocalRestaurants((restaurants) => [...restaurants, {name: "Restaurant Name", description: "Description", dishes: [], id: ""}])
    }


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
                    { localRestaurants.map((value, index) => 
                    <Grid size={{xs: 12, md: 6, lg: 4}}>
                            <RestaurantForm 
                                restaurant={value}
                                dbDishes={dbDishes}
                                dbIngredients={dbIngredients}
                                setRestaurants={setLocalRestaurants}
                                key={index}
                            />
                    </Grid>
                    )}
                   
                </Grid>

                <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={3}
                    position={"fixed"}
                    top={"3%"} right={"3%"}
                >
                    <Typography>Add new Restaurant</Typography>
                    <Fab
                        color="inherit"
                        sx={{
                            backgroundColor:"#CCA67F",

                            ":hover": {
                                backgroundColor:"#dec4ab",
                            }
                        }}
                        aria-label="add"
                        onClick={handleAddRestaurant}
                    >
                        <span className="material-symbols-outlined">add</span>
                    </Fab>
                </Stack>
            </Stack>
        </>
    )
}