import { Dish, IDish } from "../models/dish.model";
import Ingredient, { IIngredient } from "../models/ingredient.model";

export const createDishService = async (name: string, ingredients: IIngredient[]) => {
    const ingredientList = await Promise.all(
        ingredients.map(async (x) => {
            const entity = await Ingredient.findOne({ name: x.name });
            return entity ?? await Ingredient.create(x);
        })
    )

    const ingredientIds = ingredientList.map(x => x._id)
    
    const newDish = await Dish.create({name, ingredients: ingredientIds})
    
    console.log("test")

    return newDish
}