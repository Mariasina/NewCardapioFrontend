import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Fab, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api, getAuth } from "../../../../api";
import { AxiosError } from "axios";

import boi from "../../../../assets/img/boi.svg"
import carne from "../../../../assets/img/carne.svg"
import gluten from "../../../../assets/img/gluten.svg"
import { Dish, Ingredient } from "../..";

type DishesFieldProps = {
    dishes: Dish[],
    setDishes: React.Dispatch<React.SetStateAction<Dish[]>>
}

type IngredientsFieldProps = {
    ingredients: Ingredient[]
}






const IngredientsField = ({ingredients}: IngredientsFieldProps) => {
    const [_ingredients, setIngredients] = useState(ingredients)

    return (
        <Stack>
            {ingredients.map((value, index) => {
                return <>
                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={5}>
                        <Typography>{value.name}</Typography>
                        <FormGroup>
                            <Stack flexDirection={"row"}>
                                <FormControlLabel control={<Checkbox />} checked={value.isMeat} label={<img src={carne}/>} />
                                <FormControlLabel control={<Checkbox />} checked={value.isAnimal} label={<img src={boi}/>} />
                                <FormControlLabel control={<Checkbox />} checked={value.hasGluten} label={<img src={gluten}/>} />
                            </Stack>
                        </FormGroup>
                    </Stack>
                </>;
            })}
        </Stack>
    )
}

const DishesField = ({dishes: dishes, setDishes}: DishesFieldProps) => {

    return (
        <>
            <Stack sx={{
                "div": {
                    backgroundColor: "transparent"
                }
            }}>
                {dishes.map((value, index) => <>
                    <Accordion key={index} variant="elevation" >
                        <AccordionSummary>
                            <Typography>{value.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <IngredientsField ingredients={value.ingredients}/>
                            <Fab variant="extended">
                                <span className="material-symbols-outlined">add</span>
                                <Typography>Add Ingredient</Typography>
                            </Fab>
                        </AccordionDetails>
                    </Accordion>
                </>)}
                
                <Fab variant="extended" sx={{width: "fit-content", marginTop: "30px"}}>
                    <span className="material-symbols-outlined">add</span>
                    <Typography>Add Dish</Typography>
                </Fab>
            </Stack>
        </>
    )
}


const dishList: Dish[] = [
    {
        name: "Dish",
        ingredients: [
            {
                name: "Ingredient",
                hasGluten: true,
                isAnimal: false,
                isMeat: true
            },
            {
                name: "Ingredient3",
                hasGluten: false,
                isAnimal: true,
                isMeat: true
            },
            {
                name: "Ingredient2",
                hasGluten: true,
                isAnimal: true,
                isMeat: true
            }
        ]

    },
    {
        name: "Dish",
        ingredients: [
            {
                name: "Ingredient",
                hasGluten: true,
                isAnimal: true,
                isMeat: false
            },
            {
                name: "Ingredient3",
                hasGluten: true,
                isAnimal: true,
                isMeat: true
            },
            {
                name: "Ingredient2",
                hasGluten: true,
                isAnimal: true,
                isMeat: true
            }
        ]

    }
]

export default function RestaurantForm() {
    const [title, setTitle] = useState("Nome do restaurante")
    const [description, setDescription] = useState("Descrição do restaurante")
    const [dishes, setDishes] = useState<Dish[]>(dishList)

    const textAreaInputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const element = e.currentTarget;
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }

    return (
        <>
            <Stack gap={0} padding={3} sx={{
                outline: "2px solid #E4D7CC",
                borderRadius: "20px",
                boxShadow: "2px 8px 15px 5px #4338383a"
            }}>
                <TitleInputContainer>
                    <TitleInput value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                </TitleInputContainer>
                
                <DescriptionInput
                    onInput={textAreaInputHandler}
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                />

                <DishesField dishes={dishes} setDishes={setDishes}/>
            </Stack>
        </>
    )
}