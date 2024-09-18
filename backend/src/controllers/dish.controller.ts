import { Request, Response } from "express";
import { createDishRequest } from "../schemas/dish.schema";
import { IMessageResponse } from "../dtos";
import { createDishService } from "../services/dish.services";

export const createDishController = async (req: Request<{}, {}, createDishRequest>, res: Response<IMessageResponse>) => {
    const {name, ingredients} = req.body

    const newDish = await createDishService({name, ingredients})

    return newDish
}