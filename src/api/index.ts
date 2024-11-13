import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const getAuth = (token: string | null)  => {
    console.log(apiUrl)
    return !token ? {} : {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const api = axios.create({
    baseURL: apiUrl
})