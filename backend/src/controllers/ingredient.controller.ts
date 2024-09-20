import { Request, Response } from "express";
import { createIngredientRequest } from "../schemas/ingredient.schemas";
import { IMessageResponse } from "../dtos";
import { createIngredientService, getIngredientService } from "../services/ingredient.services";
import { IngredientListResponse } from "../dtos/ingredient.dto";

export const getIngredientController = async (req: Request, res: Response<IngredientListResponse>) => {
    const ingredients = await getIngredientService()

    res.json({
        message: "Succesfully fetched ingredient list!",
        ingredients
    })
}

export const createIngredientController = async(req: Request<{}, {}, createIngredientRequest>, res: Response<IMessageResponse>) => {
    const {name, hasGluten, isAnimal, isMeat} = req.body

    await createIngredientService({name, hasGluten, isAnimal, isMeat})

    res.json({
        message: `Ingredient (${name}) was created!`
    })
}