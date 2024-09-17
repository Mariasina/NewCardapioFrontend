import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import { verifyToken } from './middlewares/auth.middleware';
import { AppError } from './errors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Normal routes
app.use(authRoutes)


app.use(verifyToken)

//Authenticated routes
app.use(userRoutes)


app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    let status = 500
    const response = {
        message: err.message
    }

    if (err instanceof AppError) {
        status = err.status
    }

    res.status(status).json(response)

    next()
})

export { app }