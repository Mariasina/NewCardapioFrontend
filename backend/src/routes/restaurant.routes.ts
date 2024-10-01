import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createRestaurantSchema } from "../schemas/restaurant.schemas";
import { createRestaurantController, getRestaurantByIdController, getRestaurantController } from "../controllers/restaurant.controller";

const restaurantRoutes = Router()

restaurantRoutes.get("/restaurant", getRestaurantController)
restaurantRoutes.get("/restaurant/:id", getRestaurantByIdController)
restaurantRoutes.post("/restaurant", validate(createRestaurantSchema), createRestaurantController)

export default restaurantRoutes