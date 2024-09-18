import { Request, Response } from "express";
import { createIngredientRequest } from "../schemas/ingredient.schemas";
import { IMessageResponse } from "../dtos";
import { createIngredientService } from "../services/ingredient.services";
import { AppError } from "../errors";

export const createIngredient = async(req: Request<{}, {}, createIngredientRequest>, res: Response<IMessageResponse>) => {
    const {name, hasGluten, isAnimal, isMeat} = req.body

    const ingredient = await createIngredientService(name, hasGluten, isAnimal, isMeat)

    if (!ingredient)
        throw new AppError("Failed to create user!", 400)

    res.json({
        message: `Ingredient (${name}) was created!`
    })
}