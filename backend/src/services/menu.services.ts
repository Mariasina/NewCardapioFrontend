import { AppError } from "../errors"
import { Menu } from "../models/menu.model"
import { Restaurant } from "../models/restaurant.model"

export const createMenuService = async(date: Date, restaurants: string[]) => {
    const restaurantsId = await Promise.all(restaurants.map(async x => {
        const restaurant = await Restaurant.findById(x)
        if(!restaurant){
            throw new AppError("Invalid restaurant", 404)
        }
        return restaurant._id
    }))

    await Menu.create({date, restaurants: restaurantsId})
    
}