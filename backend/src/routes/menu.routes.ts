import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { createMenuSchema } from "../schemas/menu.schemas";
import { createMenuController } from "../controllers/menu.controller";

const menuRoutes = Router()

menuRoutes.post("/menu", validate(createMenuSchema), createMenuController)

export default menuRoutes