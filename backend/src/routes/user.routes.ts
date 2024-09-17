import { Router } from "express";
import { createAdmin, adminLogin } from "../controllers/auth.controller";

const userRoutes = Router()

userRoutes.get("/", async (req, res) => {
    res.send("ok")
})

export default userRoutes