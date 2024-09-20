import { Request, Response } from "express";
import { IMessageResponse } from "../dtos";
import { createRestaurantRequest } from "../schemas/restaurant.schemas";
import { createRestaurantService, getRestaurantService } from "../services/restaurant.services";
import { IRestaurant } from "../models/restaurant.model";
import { RestaurantListResponse } from "../dtos/restaurant.dto";

export const getRestaurantController = async (req: Request, res: Response<RestaurantListResponse>) => {
    const restaurants = await getRestaurantService()

    res.json({
        message: "Succesfully fetched the restaurant list!",
        restaurants
    })
}

export const createRestaurantController = async(req: Request<{}, {}, createRestaurantRequest>, res: Response<IMessageResponse>) => {
    const { name, description, dishes} = req.body

    const newRestaurant = await createRestaurantService(name, description, dishes)

    res.json({
        message: `Restaurant (${name}) was created!`
    })

}