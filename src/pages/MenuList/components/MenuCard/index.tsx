import { Typography } from "@mui/material";
import { CardBox } from "./styles";
import { useLanguage } from "../../../../languageContext/LanguageContext";


export default function MenuCard() {
    const {languageData: lang} = useLanguage()

    return (
        <>
            <CardBox>
                <Typography fontFamily={"Margarine"} color="var(--bg-primary)" variant="h5">{lang.menu}</Typography>
            </CardBox>
        </>
    )
}