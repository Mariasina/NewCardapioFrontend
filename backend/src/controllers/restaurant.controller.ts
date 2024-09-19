import { Request, Response } from "express";
import { IMessageResponse } from "../dtos";
import { createRestaurantRequest } from "../schemas/restaurant.schemas";
import { createRestaurantService } from "../services/restaurant.services";
import { IRestaurant } from "../models/restaurant.model";

export const createRestaurantController = async(req: Request<{}, {}, createRestaurantRequest>, res: Response<IMessageResponse>) => {
    const { name, description, dishes} = req.body

    const newRestaurant = await createRestaurantService(name, description, dishes)

    res.json({
        message: `Restaurant (${name}) was created!`
    })

}