import Ingredient, { IIngredient } from "../models/ingredient.model"

export const createIngredientService = async (ingredient: IIngredient) => {
    const newIngredient = await Ingredient.create(ingredient)

    return newIngredient
}