import { Dish, IDish } from "../models/dish.model";

export const createDishService = async (dish: IDish) => {
    const newDish = await Dish.create(dish)
    
    return newDish
}