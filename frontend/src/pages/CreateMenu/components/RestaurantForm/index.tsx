import { Stack } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { useState } from "react";

export default function RestaurantForm() {
    const [description, setDescription] = useState("Descrição do restaurante")
    return (
        <>
            <Stack>
                <TitleInputContainer>
                    <TitleInput/>
                </TitleInputContainer>
                <DescriptionInput rows={3} value={description} onChange={(e) => {setDescription(e.target.value)}}/>
            </Stack>
        </>
    )
}