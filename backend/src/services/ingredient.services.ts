import Ingredient from "../models/ingredient.model"

export const createIngredientService = async (name: string, hasGluten: boolean, isAnimal: boolean, isMeat: boolean) => {
    const ingredient = await Ingredient.create({ name, hasGluten, isAnimal, isMeat })

    return ingredient
}