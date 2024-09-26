import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Fab, FormControlLabel, FormGroup, Modal, Stack, TextField, Typography } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api, getAuth } from "../../../../api";
import { AxiosError } from "axios";

import boi from "../../../../assets/img/boi.svg"
import carne from "../../../../assets/img/carne.svg"
import gluten from "../../../../assets/img/gluten.svg"
import { Dish, Ingredient, Restaurant } from "../..";

type DishesFieldProps = {
    dbDishes: Dish[],
    dbIngredients: Ingredient[],
    localDishes: Dish[]
    setDishes: React.Dispatch<React.SetStateAction<Dish[]>>
}

type IngredientsFieldProps = {
    dbIngredients: Ingredient[]
    localIngredients: Ingredient[]
    setLocalIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>

}


type RestaurantFormProps = {
    dbIngredients: Ingredient[],
    dbDishes: Dish[],
    restaurant: Restaurant,
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>
}


const IngredientsField = ({ dbIngredients, localIngredients, setLocalIngredients }: IngredientsFieldProps) => {
    const [ingredients, setIngredients] = useState(localIngredients)

    return (
        <Stack>
            {ingredients.map((value, index) => {
                return <>
                    <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={5}>
                        <Typography>{value.name}</Typography>
                        <FormGroup>
                            <Stack flexDirection={"row"}>
                                <FormControlLabel control={<Checkbox />} checked={value.isMeat} label={<img src={carne} />} />
                                <FormControlLabel control={<Checkbox />} checked={value.isAnimal} label={<img src={boi} />} />
                                <FormControlLabel control={<Checkbox />} checked={value.hasGluten} label={<img src={gluten} />} />
                            </Stack>
                        </FormGroup>
                    </Stack>
                </>;
            })}
        </Stack>
    )
}

const DishesField = ({ localDishes, dbDishes, dbIngredients, setDishes }: DishesFieldProps) => {
    const [openAddDish, setOpenAddDish] = useState(false)
    const [openAddIngredient, setOpenAddIngredient] = useState(false)
    const [modalDish, setModalDish] = useState("")
    const [modalIngredient, setModalIngredient] = useState("")

    console.log(localDishes)

    const handleAddDish = () => {
        setOpenAddDish(true)
    }

    const handleModalAddDish = () => {
        console.log(modalDish)
        setDishes(value => [...value, {id: "", name: modalDish, ingredients: []}])
        setOpenAddDish(false)
        setModalDish("")
    }

    const handleAddIngredient = () => {
        setOpenAddIngredient(true)
    }

    const handleModalAddIngredient = () => {
        // localDishes.
        // setDishes(value => )
        setOpenAddDish(false)
       
    }
    return (
        <>
            <Modal
                open={openAddDish}
                onClose={() => setOpenAddDish(false)}
                aria-labelledby="dish-modal-title"
            >
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="dish-modal-title" variant="h6" component="h2">
                        Add Dish
                    </Typography>
                    <TextField fullWidth label="Name" value={modalDish} onChange={(e) => setModalDish(e.target.value)}/>

                    <Button variant="outlined" sx={{marginLeft: "auto"}} onClick={handleModalAddDish}>Add</Button>
                    
                </Box>
            </Modal>
            <Modal
                open={openAddIngredient}
                onClose={() => setOpenAddIngredient(false)}
                aria-labelledby="ingredient-modal-title"
                aria-describedby="ingredient-modal-description"
            >
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="ingredient-modal-title" variant="h6" component="h2">
                        Add Ingredient
                    </Typography>
                    <TextField fullWidth label="Name" value={modalIngredient} onChange={(e) => setModalIngredient(e.target.value)}/>

                    <Button variant="outlined" sx={{marginLeft: "auto"}} onClick={handleModalAddIngredient}>Add</Button>
                    
                </Box>
            </Modal>

            <Stack sx={{
                "div": {
                    backgroundColor: "transparent"
                }
            }}>
                {localDishes.map((value, index) => <>
                    <Accordion key={index} variant="elevation" >
                        <AccordionSummary>
                            <Typography>{value.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <IngredientsField
                                dbIngredients={dbIngredients}
                                setLocalIngredients={() => {}}
                                localIngredients={value.ingredients}
                            />
                            <Fab variant="extended" onClick={handleAddIngredient}>
                                <span className="material-symbols-outlined">add</span>
                                <Typography>Add Ingredient</Typography>
                            </Fab>
                        </AccordionDetails>
                    </Accordion>
                </>)}

                <Fab variant="extended" sx={{ width: "fit-content", marginTop: "30px" }} onClick={handleAddDish}>
                    <span className="material-symbols-outlined">add</span>
                    <Typography>Add Dish</Typography>
                </Fab>
            </Stack>
        </>
    )
}




export default function RestaurantForm({ restaurant, setRestaurants, dbDishes, dbIngredients }: RestaurantFormProps) {
    // const [title, setTitle] = useState("Nome do restaurante")
    // const [description, setDescription] = useState("Descrição do restaurante")
    // const [dishes, setDishes] = useState<Dish[]>(dishList)
    const [dishes, setDishes] = useState<Dish[]>([])
    const [restaurantInfo, setRestaurantInfo] = useState(restaurant)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [step, setStep] = useState(0)

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
                    <TitleInput
                        value={restaurantInfo.name}
                        onChange={(e) => { setRestaurantInfo({ ...restaurantInfo, name: e.target.value }) }}
                        onKeyUp={(e) => { if (e.key === "Enter") setStep(value => value + 1) }}
                    />
                </TitleInputContainer>

                {step > 0 &&
                    <DescriptionInput
                        onInput={textAreaInputHandler}
                        value={restaurantInfo.description}
                        onKeyUp={(e) => { if (e.key === "Enter") setStep(value => value + 1) }}
                        onChange={(e) => { setRestaurantInfo({ ...restaurantInfo, description: e.target.value }) }}
                    />
                }

                {step > 1 &&
                    <DishesField dbIngredients={dbIngredients} localDishes={dishes} setDishes={setDishes} dbDishes={dbDishes} />
                }
            </Stack>
        </>
    )
}