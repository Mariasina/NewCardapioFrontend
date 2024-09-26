import axios, { AxiosHeaders } from "axios";


export const getAuth = (token: string | null)  => {
    return !token ? {} : {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const api = axios.create({
    baseURL: "http://localhost:8080"
})