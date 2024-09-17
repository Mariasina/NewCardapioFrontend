import { Router } from "express";
import { createAdmin, adminLogin } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { createAdminSchema, userLoginSchema } from "../schemas/user.schemas";

const authRoutes = Router()

authRoutes.post("/createAdmin", validate(createAdminSchema), createAdmin)

authRoutes.post("/login", validate(userLoginSchema), adminLogin)


export default authRoutes