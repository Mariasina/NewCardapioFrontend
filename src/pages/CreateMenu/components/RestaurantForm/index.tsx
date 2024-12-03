/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Autocomplete, 
    Box, 
    Button, 
    Checkbox, 
    Fab, 
    FormControlLabel, 
    FormGroup, 
    Modal, 
    Stack, 
    TextField, 
    Typography 
} from "@mui/material";
import { DescriptionInput, TitleInput, TitleInputContainer } from "./styles";
import { useEffect, useState } from "react";
import boi from "../../../../assets/img/boi.svg";
import carne from "../../../../assets/img/carne.svg";
import gluten from "../../../../assets/img/gluten.svg";
import { Dish, Ingredient, Restaurant } from "../..";
import { api, getAuth } from "../../../../api/index.ts";
import { AxiosError } from "axios";
import { useLanguage } from "../../../../languageContext/LanguageContext.tsx";

// Types
type DishesFieldProps = {
    localDishes: Dish[],
    setLocalDishes: React.Dispatch<React.SetStateAction<Dish[]>>
}


type RestaurantFormProps = {
    dbIngredients: Ingredient[],
    dbDishes: Dish[],
    restaurant: Restaurant,
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>
}

type IngredientsFieldProps = {
    localIngredients: Ingredient[],
    updateIngredientProperty: (index: number, property: 'isMeat' | 'isAnimal' | 'hasGluten', value: boolean) => void,
}



const IngredientsField = ({ localIngredients, updateIngredientProperty }: IngredientsFieldProps) => {
    return (
        <Stack>
            {localIngredients.map((ingredient, index) => (
                <Stack key={index} flexDirection="row" alignItems="center" justifyContent="space-between" gap={5}>
                    <Typography>{ingredient.name}</Typography>
                    <FormGroup>
                        <Stack flexDirection="row">
                            <FormControlLabel 
                                control={<Checkbox checked={ingredient.isMeat} />}
                                onChange={(_, value) => updateIngredientProperty(index, "isMeat", value)}
                                label={<img src={carne} alt="Meat" />} 
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={ingredient.isAnimal} />}
                                onChange={(_, value) => updateIngredientProperty(index, "isAnimal", value)}
                                label={<img src={boi} alt="Animal" />} 
                            />
                            <FormControlLabel 
                                control={<Checkbox checked={ingredient.hasGluten} />}
                                onChange={(_, value) => updateIngredientProperty(index, "hasGluten", value)}
                                label={<img src={gluten} alt="Gluten" />} 
                            />
                        </Stack>
                    </FormGroup>
                </Stack>
            ))}
        </Stack>
    );
};



// DishesField Component
const DishesField = ({localDishes, setLocalDishes}: DishesFieldProps) => {
    const {languageData: lang} = useLanguage()

    const [openAddDish, setOpenAddDish] = useState(false);
    const [openAddIngredient, setOpenAddIngredient] = useState(false);
    const [modalDish, setModalDish] = useState<Dish | string>("");
    const [modalIngredient, setModalIngredient] = useState<Ingredient | string>("");
    const [modalIngredientDishIndex, setModalDishIndex] = useState<number | undefined>();
    const [dbDishesState, setDbDishes] = useState<Dish[]>([]);
    const [dbIngredientsState, setDbIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const res = await api.get("/dish", getAuth(localStorage.getItem("token")));
                setDbDishes(res.data.dishes);
            } catch (err) {
                alert((err as AxiosError).message);
            }
        };

        const fetchIngredients = async () => {
            try {
                const res = await api.get("/ingredient", getAuth(localStorage.getItem("token")));
                setDbIngredients(res.data.ingredients);
            } catch (err) {
                alert((err as AxiosError).message);
            }
        };

        fetchDishes();
        fetchIngredients();
    }, []);

    const handleAddDish = () => setOpenAddDish(true);

    const handleModalAddDish = () => {
        const newDish = typeof modalDish === 'string' 
            ? { id: "", name: modalDish, ingredients: [] } 
            : modalDish;

        setLocalDishes(prev => [...prev, newDish]);
        setOpenAddDish(false);
        setModalDish("");
    };

    const handleAddIngredient = (dishIndex: number) => {
        setModalDishIndex(dishIndex);
        setOpenAddIngredient(true);
    };

    const handleModalAddIngredient = () => {
        if (modalIngredientDishIndex === undefined) return;

        const newIngredient: Ingredient = typeof modalIngredient === 'string'
            ? { id: "", name: modalIngredient, hasGluten: false, isAnimal: false, isMeat: false }
            : modalIngredient;

        setLocalDishes(prevDishes => {
            const updatedDishes = [...prevDishes];
            updatedDishes[modalIngredientDishIndex].ingredients.push(newIngredient);
            return updatedDishes;
        });

        setOpenAddIngredient(false);
        setModalIngredient("");
    };

    const updateIngredientProperty = (dishIndex: number, ingredientIndex: number, property: 'isMeat' | 'isAnimal' | 'hasGluten', value: boolean) => {
        setLocalDishes(prevDishes => {
            const updatedDishes = [...prevDishes];
            updatedDishes[dishIndex].ingredients[ingredientIndex][property] = value;
            return updatedDishes;
        });
    };

    return (
        <>
            <Modal open={openAddDish} onClose={() => setOpenAddDish(false)}>
                <Box sx={modalStyle}>
                    <Typography id="dish-modal-title" variant="h6">{lang.add_dish}</Typography>
                    <Autocomplete
                        disablePortal
                        value={modalDish}
                        options={dbDishesState}
                        getOptionLabel={(option) => typeof option === "string" ? option : option.name}
                        renderInput={(params) => <TextField {...params} label="Nome" />}
                        onChange={(_, newValue) => setModalDish(newValue ?? "")}
                        onInputChange={(_, newValue) => setModalDish(newValue ?? "")}
                        freeSolo
                    />
                    <Button variant="outlined" sx={{ marginLeft: "auto" }} onClick={handleModalAddDish}>Add</Button>
                </Box>
            </Modal>

            <Modal open={openAddIngredient} onClose={() => setOpenAddIngredient(false)}>
                <Box sx={modalStyle}>
                    <Typography id="ingredient-modal-title" variant="h6">{lang.add_ingredient}</Typography>
                    <Autocomplete
                        disablePortal
                        value={modalIngredient}
                        options={dbIngredientsState}
                        getOptionLabel={(option) => typeof option === "string" ? option : option.name}
                        renderInput={(params) => <TextField {...params} label="Nome" />}
                        onChange={(_, newValue) => setModalIngredient(newValue ?? "")}
                        onInputChange={(_, newValue) => setModalIngredient(newValue ?? "")}
                        freeSolo
                    />
                    <Button variant="outlined" sx={{ marginLeft: "auto" }} onClick={handleModalAddIngredient}>Add</Button>
                </Box>
            </Modal>

            <Stack>
                {localDishes.map((dish, index) => (
                    <Accordion key={index}>
                        <AccordionSummary>
                            <Typography>{dish.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <IngredientsField
                                localIngredients={dish.ingredients}
                                updateIngredientProperty={(ingredientIndex, property, value) => 
                                    updateIngredientProperty(index, ingredientIndex, property, value)
                                }
                            />
                            <Fab variant="extended" onClick={() => handleAddIngredient(index)}>
                                <span className="material-symbols-outlined">add</span>
                                <Typography>{lang.add_ingredient}</Typography>
                            </Fab>
                        </AccordionDetails>
                    </Accordion>
                ))}
                <Fab variant="extended" sx={{ width: "fit-content", marginTop: "30px" }} onClick={handleAddDish}>
                    <span className="material-symbols-outlined">add</span>
                    <Typography>{lang.add_dish}</Typography>
                </Fab>
            </Stack>
        </>
    );
};


export default function RestaurantForm({ restaurant, setRestaurants, dbDishes, dbIngredients }: RestaurantFormProps) {
    const [title, setTitle] = useState(restaurant.name);
    const [description, setDescription] = useState(restaurant.description);
    const [step, setStep] = useState(0);
    const [localDishes, setLocalDishes] = useState<Dish[]>([])

    useEffect(() => {
        setRestaurants(restaurants => {
            return restaurants.map(r => 
                r.name === restaurant.name && r.description === restaurant.description
                    ? { ...r, name: title, description: description.trim(), dishes: localDishes, id: r.id }
                    : r
            );
        })
    }, [title, description, step, localDishes, restaurant.name, restaurant.description])

    const handleTextAreaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const element = e.currentTarget;
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
       element.value = element.value.replace(/\n/g, '')
    };

    return (
        <Stack gap={0} padding={3} sx={formContainerStyle}>
            <TitleInputContainer>
                <TitleInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyUp={(e) => { if (e.key === "Enter" && step === 0) setStep(prev => prev + 1); }}
                />
            </TitleInputContainer>

            {step > 0 && (
                <DescriptionInput
                    onInput={handleTextAreaInput}
                    value={description}
                    onKeyUp={(e) => { if (e.key === "Enter" && step === 1) setStep(prev => prev + 1); }}
                    onChange={(e) => setDescription(e.target.value)}
                />
            )}

            {step > 1 && (
                <DishesField localDishes={localDishes} setLocalDishes={setLocalDishes}/>
            )}
        </Stack>
    );
}

const modalStyle = {
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
};

const formContainerStyle = {
    outline: "2px solid #E4D7CC",
    borderRadius: "20px",
    boxShadow: "2px 8px 15px 5px #4338383a",
};
