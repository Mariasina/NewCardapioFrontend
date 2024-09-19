import { Request, Response } from "express";
import { createDishRequest } from "../schemas/dish.schema";
import { IMessageResponse } from "../dtos";
import { createDishService } from "../services/dish.services";
import { IIngredient } from "../models/ingredient.model";
import { IDish } from "../models/dish.model";

export const createDishController = async (req: Request<{}, {}, createDishRequest>, res: Response<IDish>) => {
    const {name, ingredients} = req.body


    const newDish = await createDishService(name, (ingredients as IIngredient[]))

    res.json(newDish)
}