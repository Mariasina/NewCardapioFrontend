import { Fab, Stack } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { createContext, ReactNode, useState } from "react";

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