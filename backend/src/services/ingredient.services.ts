import Ingredient, { IIngredient } from "../models/ingredient.model"

export const getIngredientService = async () => {
    const ingredients = await Ingredient.find()
    return ingredients
}
export const createIngredientService = async (ingredient: IIngredient) => {
    const newIngredient = await Ingredient.create(ingredient)

    return newIngredient
}