import { Router } from "express";
import { getUserController } from "../controllers/user.controller";

const userRoutes = Router()

userRoutes.get("/restaurant", getUserController)

export default userRoutes
