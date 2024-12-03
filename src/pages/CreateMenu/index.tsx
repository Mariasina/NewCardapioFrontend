import { Box, Button, Fab, Grid2 as Grid, Stack, Typography } from "@mui/material";
import RestaurantForm from "./components/RestaurantForm";
import { useEffect, useState } from "react";
import { api, getAuth } from "../../api/index.ts";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DefaultResponse } from "../../types";
import { JwtPayload } from "../../utils/jwt.utils";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLanguage } from "../../languageContext/LanguageContext.tsx";

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
    const [date, setDate] = useState<Date>(new Date())

    const token = localStorage.getItem("token")

    const { languageData: lang } = useLanguage()

    const { isExpired } = useJwt<JwtPayload>(token ?? "")

    const navigate = useNavigate()

    if (isExpired || !token) {
        localStorage.removeItem("token")
        navigate("/login")
    }


    const [dbIngredients, setDbIngredients] = useState<Ingredient[]>([])

    const [dbDishes, setDbDishes] = useState<Dish[]>([])

    const [localRestaurants, setLocalRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        (async () => {
            const res = await api.get<DishResponse>("/dish", getAuth(token)).catch((err: AxiosError<DefaultResponse>) => {
                // alert(err.response?.data.message)
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
                // alert(err.response?.data.message)
            })

            if (!res) {
                return
            }

            setDbIngredients(res.data.ingredients)
        })()
    }, [])

    const handleAddRestaurant = () => {
        setLocalRestaurants((restaurants) => [...restaurants, { name: lang.restaurant_name, description: lang.restaurant_description, dishes: [], id: "" }])
    }

    const handleSubmit = async () => {
        // Validate restaurants before submitting
        const validRestaurants = localRestaurants.filter(restaurant =>
            restaurant.name.trim() !== "" &&
            restaurant.description.trim() !== "" &&
            restaurant.dishes.length > 0
        );

        if (validRestaurants.length === 0) {
            alert("Please add at least one complete restaurant");
            return;
        }

        const restaurantsData = validRestaurants.map(restaurant => ({
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            dishes: restaurant.dishes.map(dish => ({
                id: dish.id,
                name: dish.name,
                ingredients: dish.ingredients.map(ingredient => ({
                    id: ingredient.id,
                    name: ingredient.name,
                    hasGluten: ingredient.hasGluten,
                    isAnimal: ingredient.isAnimal,
                    isMeat: ingredient.isMeat,
                }))
            }))
        }));

        // Send to backend
        try {
            const res = await api.post("/menu", {
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                restaurants: restaurantsData
            }, getAuth(token));
            alert("Data saved successfully");
            
            navigate("/menus")
        } catch (err) {
            alert((err as AxiosError).message);
        }
    };



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
                <Grid container spacing={10} width={"100%"} mt={5}>
                    {localRestaurants.map((value, index) =>
                        <Grid size={{ xs: 12, md: 6, lg: 4 }} minWidth={"min-content"}>
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
                        top={"3%"}
                        right={"3%"}
                        zIndex={"99999999999"} // Keeps the component above the blur
                        sx={{
                            backgroundColor: "rgba(255, 255, 255)", // Optional to give your component a solid base
                            borderRadius: "8px",
                            padding: "8px 16px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
                        }}
                    >
                        <Typography>{lang.add_new_restaurant}</Typography>
                        <Fab
                            color="inherit"
                            sx={{
                                backgroundColor: "#CCA67F",
                                ":hover": {
                                    backgroundColor: "#dec4ab",
                                },
                            }}
                            aria-label="add"
                            onClick={handleAddRestaurant}
                        >
                            <span className="material-symbols-outlined">add</span>
                        </Fab>
                        <Button variant="contained" onClick={handleSubmit}>
                            {lang.submit_menu}
                        </Button>
                        <DatePicker
                            label={lang.date_picker}
                            onChange={(e) => setDate(e?.toDate() || new Date())}
                        />
                    </Stack>

            </Stack>
        </>
    )
}