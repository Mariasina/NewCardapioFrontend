import { Request, Response } from "express"
import { createMenuRequest } from "../schemas/menu.schemas"
import { IMessageResponse } from "../dtos"
import { createMenuService, getMenusService } from "../services/menu.services"
import { MenuListResponse } from "../dtos/menu.dto"

export const getMenusController = async (req: Request, res: Response<MenuListResponse>) => {
    const menus = await getMenusService()

    res.json({
        message: "Succesfully fetched the menu list!",
        menus
    })
}

export const createMenuController = async(req: Request<{}, {}, createMenuRequest>, res: Response<IMessageResponse>) => {
    const { date, restaurants} = req.body

    const newMenu = await createMenuService(new Date(date), restaurants)
    
    res.json({
        message: `Menu for (${date}) was created!`
    })

}