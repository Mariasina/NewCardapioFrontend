import { Types } from "mongoose";
import { Dish, IDish } from "../models/dish.model";
import { AppError } from "../errors";
import { Restaurant } from "../models/restaurant.model";

export const getRestaurantService = async () => {
    return await Restaurant.find()
}

export const getRestaurantByIdService = async ({id} : {id : string}) => {
    return await Restaurant.findById(id)
}

export const createRestaurantService = async(name: string, description: string, dishes: string[]) => {
    const dishesId = await Promise.all(dishes.map(async x => {
        const dish = await Dish.findById(x)
        if(!dish){
            throw new AppError("Invalid dish", 404)
        }
        return dish._id
    }))

    await Restaurant.create({name, description, dishes: dishesId})
    
}