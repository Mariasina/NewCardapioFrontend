import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

import data from "../assets/langFile.json"

interface LanguageJsonData {
    [key: string]: string
}

type LanguageOptions = "PT" | "EN"

interface LanguageContextType {
    changeLanguage: (language: LanguageOptions) => void
    languageData: LanguageJsonData
    language: LanguageOptions
}

const LanguageContext = createContext<LanguageContextType>({
    changeLanguage: () => {},
    languageData: {},
    language: "PT"
})

export const LanguageProvider: FC<{children: ReactNode}> = ({children}) => {
    const [language, setLanguage] = useState<LanguageOptions>(localStorage.getItem("language") as LanguageOptions ?? "PT")
    const [languageData, setLanguageData] = useState<LanguageJsonData>({})

    const changeLanguage = (value: LanguageOptions) => {
        setLanguage(value)
        localStorage.setItem("language", value)
    }

    const loadLanguageData = (value: LanguageOptions): LanguageJsonData => {
        return data.text.reduce((acc, curr) => {
            acc[curr.name] = value === "PT" ? curr.pt : curr.en;
            
            return acc
        }, {} as LanguageJsonData)
    }

    useEffect(() => {
        const langData = loadLanguageData(language)

        setLanguageData(langData)

    }, [language])



    return <LanguageContext.Provider value={{
        language, languageData, changeLanguage
    }}>
        {children}
    </LanguageContext.Provider>
}


export const useLanguage = () => useContext(LanguageContext)