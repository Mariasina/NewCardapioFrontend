import { Fab, Stack } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api, getAuth } from "../../../../api";
import { AxiosError } from "axios";

type IngredientsFieldProps = {
    ingredients: Ingredient[],
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

export type Ingredient = {
    name: string,
    hasGluten: boolean,
    isAnimal: boolean,
    isMeat: boolean
}



const IngredientsField = ({ingredients}: IngredientsFieldProps) => {

    useEffect(() => {
        (async () => {
            const res = api.get("/menu").catch((err: AxiosError) => {
                alert(err.message)
            })
            
        })()
    }, [])

    return (
        <>
            <Stack>
                {ingredients.map(x => <>
                    
                </>)}
                
                <Fab>
                    <span className="material-symbols-outlined">add</span>
                </Fab>
            </Stack>
        </>
    )
}

export default function RestaurantForm() {
    const [title, setTitle] = useState("Nome do restaurante")
    const [description, setDescription] = useState("Descrição do restaurante")
    const [ingredients, setIngredients] = useState<Ingredient[]>([])


    return (
        <>
            <Stack gap={2}>
                <TitleInputContainer>
                    <TitleInput value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                </TitleInputContainer>
                <DescriptionInput rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}}/>

                <IngredientsField ingredients={ingredients}/>
            </Stack>
        </>
    )
}