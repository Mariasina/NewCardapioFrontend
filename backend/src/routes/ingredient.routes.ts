import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createIngredientSchema } from "../schemas/ingredient.schemas";
import { createIngredientController } from "../controllers/ingredient.controller";

const ingredientRoutes = Router()

ingredientRoutes.post("/ingredient", validate(createIngredientSchema), createIngredientController)

export default ingredientRoutes