import { Box, Stack, styled, Typography } from "@mui/material"
import { Ingredient } from "../.."
import { ReactElement, useState } from "react"

import gluten from "../../../../assets/img/GlutenIconGreen.png"
import animal from "../../../../assets/img/CowIconGreen.png"
import meat from "../../../../assets/img/MeatIconGreen.png"

type IngredientTooltipProps = {
    children: ReactElement
    ingredients: Ingredient[]
}

const TooltipBox = styled(Box)`
    position: absolute;
    right: -20%;
    padding: 20px;
    outline: 3px solid green;
    background-color: white;
    z-index: 999;
    border-radius: 15px;
`

export default function IngredientTooltip({children, ingredients}: IngredientTooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    const showTooltip = () => setIsVisible(true)
    const hideTooltip = () => setIsVisible(false)
    
    return (
        <Box position={"relative"} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {isVisible && 
                <TooltipBox minWidth={"max-content"}>
                    <Typography variant="h6">Ingredient List</Typography>
                    <Stack gap={1} mt={2}>
                        {ingredients.map(ingredient => 
                            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                                <Typography fontSize={18}>{ingredient.name}</Typography>
                                {ingredient.hasGluten && <img src={gluten}></img>}
                                {ingredient.isAnimal && <img src={animal}></img>}
                                {ingredient.isMeat && <img src={meat}></img>}
                            </Stack>
                        )}
                    </Stack>
                </TooltipBox>
            }
        </Box>
    )
}