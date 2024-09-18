export const getSession = () => {
    return sessionStorage.getItem("token")
}

export const setSession = (value: string) => {
    sessionStorage.setItem("token", value)
}