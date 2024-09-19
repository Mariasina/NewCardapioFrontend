import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createDishSchema } from "../schemas/dish.schemas";
import { createDishController } from "../controllers/dish.controller";

const dishRoutes = Router()

dishRoutes.post("/dish", validate(createDishSchema), createDishController)

export default dishRoutes