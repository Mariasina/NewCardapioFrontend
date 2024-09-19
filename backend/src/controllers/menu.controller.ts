import { Request, Response } from "express"
import { createMenuRequest } from "../schemas/menu.schemas"
import { IMessageResponse } from "../dtos"
import { createMenuService } from "../services/menu.services"

export const createMenuController = async(req: Request<{}, {}, createMenuRequest>, res: Response<IMessageResponse>) => {
    const { date, restaurants} = req.body

    const newMenu = await createMenuService(new Date(date), restaurants)
    
    res.json({
        message: `Menu for (${date}) was created!`
    })

}