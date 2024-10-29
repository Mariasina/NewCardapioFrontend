import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Checkbox, Fab, FormControlLabel, FormGroup, Modal, Stack, TextField, Typography } from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { useEffect, useState } from "react";

import boi from "../../../../assets/img/boi.svg"
import carne from "../../../../assets/img/carne.svg"
import gluten from "../../../../assets/img/gluten.svg"
import { Dish, Ingredient, Restaurant } from "../..";
import { api, getAuth } from "../../../../api";
import { AxiosError } from "axios";

type DishesFieldProps = {
    dbDishes: Dish[],
    dbIngredients: Ingredient[],
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
            {ingredients.map((value, index) =>
                    <Stack key={index} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} gap={5}>
                        <Typography>{value.name}</Typography>
                        <FormGroup>
                            <Stack flexDirection={"row"}>
                                <FormControlLabel control={<Checkbox />} checked={value.isMeat} label={<img src={carne} />} />
                                <FormControlLabel control={<Checkbox />} checked={value.isAnimal} label={<img src={boi} />} />
                                <FormControlLabel control={<Checkbox />} checked={value.hasGluten} label={<img src={gluten} />} />
                            </Stack>
                        </FormGroup>
                    </Stack>
            )}
        </Stack>
    )
}

const DishesField = ({ dbIngredients, setDishes }: DishesFieldProps) => {
    const [openAddDish, setOpenAddDish] = useState(false)
    const [openAddIngredient, setOpenAddIngredient] = useState(false)
    const [modalDish, setModalDish] = useState<Dish | string>("")
    const [modalIngredient, setModalIngredient] = useState("")


    const [localDishes, setLocalDishes] = useState<Dish[]>([])
    const [dbDishes, setDbDishes] = useState<Dish[]>([])

    useEffect(() => {
        (async () => {
            const res = await api.get("/dish", getAuth(localStorage.getItem("token"))).catch((err: AxiosError) => {
                alert(err.message)
            })

            if (!res) return

            setDbDishes(res.data.dishes)
        })()
    }, [])

    const handleAddDish = () => {
        setOpenAddDish(true)
    }

    const handleModalAddDish = () => {
        if (typeof(modalDish) === 'string') {
            setLocalDishes(value => [...value, {id: "", name: modalDish, ingredients: []}])
        } else {
            setLocalDishes(value => [...value, modalDish])
        }

        console.log(modalDish)
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

                    <Autocomplete
                        disablePortal
                        value={modalDish}
                        options={dbDishes}
                        getOptionLabel={(option) => typeof(option) == "string" ? option : option.name}
                        renderInput={(params) => <TextField {...params} label="Nome"/>}
                        onChange={(event, newValue) => setModalDish(newValue ?? "")}
                        freeSolo
                    >
                        
                    </Autocomplete>

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
    const [title, setTitle] = useState(restaurant.name)
    const [description, setDescription] = useState(restaurant.description)
    const [dishes, setDishes] = useState<Dish[]>([])
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
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        onKeyUp={(e) => { if (e.key === "Enter" && step == 0) setStep(value => value + 1) }}
                    />
                </TitleInputContainer>

                {step > 0 &&
                    <DescriptionInput
                        onInput={textAreaInputHandler}
                        value={description}
                        onKeyUp={(e) => { if (e.key === "Enter" && step == 1) setStep(value => value + 1) }}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                }

                {step > 1 &&
                    <DishesField dbIngredients={dbIngredients} setDishes={setDishes} dbDishes={dbDishes} />
                }
            </Stack>
        </>
    )
}