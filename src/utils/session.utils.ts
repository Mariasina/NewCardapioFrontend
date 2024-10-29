import { decodeToken, isExpired } from "react-jwt"

interface IJwtPayload {
    sub: string
    userId: number
    isAdmin: boolean
}

export const getSession = () => {
    const token = sessionStorage.getItem("token")

    if (!token)
        return undefined

    if (isExpired(token)) {
        setSession(undefined) 
        return
    }
    
    const decoded = decodeToken<IJwtPayload>(token)
    
    return decoded
}

export const setSession = (value: string | undefined) => {
    if (!value) {
        sessionStorage.removeItem("token")
        return
    }

    sessionStorage.setItem("token", value)
}