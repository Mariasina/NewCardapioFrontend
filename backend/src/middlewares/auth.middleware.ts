import { NextFunction, Request, Response } from "express";
import { base64url, EncryptJWT, jwtVerify } from "jose"
import { AppError } from "../errors";

let secretToken: string | undefined

if (!(secretToken = process.env.SECRET_TOKEN) || secretToken === "") {
    console.error("Secret token is not defined! Using default token...")

    secretToken = "defaulttoken"
}

const secret = base64url.decode(secretToken);


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token)
        throw new AppError("Empty authorization headers", 401)

    const jwt = token.replace("Bearer", "").trim()


    try {
        const { payload } = await jwtVerify(jwt, secret)
        res.locals.sessionInfo = payload
    } catch (err: any) {
        throw new AppError(err.message, 401)
    }
    

    next()
}