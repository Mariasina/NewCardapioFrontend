import { Router } from "express";
import { createAdmin, userLogin } from "../controllers/auth.controller";

const authRoutes = Router()

authRoutes.get("/createAdmin", createAdmin)

authRoutes.post("/login", userLogin)


export default authRoutes