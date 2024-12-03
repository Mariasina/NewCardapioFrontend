import { ImgFlag } from "./styles";
import flag from "../../assets/img/flag-usa.svg"
import flagBR from "../../assets/img/flag-brazil.svg"
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useLanguage } from "../../languageContext/LanguageContext";

function LanguageSelector() {
    const {changeLanguage, language} = useLanguage()

    const [value, setValue] = useState(language)



    const changeValue = (value: "PT" | "EN") => {
        setValue(value)
        changeLanguage(value)
    }

    return (
        <>
            <FormControl fullWidth sx={{minWidth: "100px"}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => changeValue(e.target.value as "PT" | "EN")}
                    variant="standard"

                    sx={{
                        ".MuiSvgIcon-root": {
                            fill: "white"
                        },
                        ':before': { borderBottomColor: '#0C482E' },
                        ':after': { borderBottomColor: 'white' },
                    }}
                >
                    <MenuItem value={"EN"}><ImgFlag src={flag}/></MenuItem>
                    <MenuItem value={"PT"}><ImgFlag src={flagBR}/></MenuItem>
                </Select>
            </FormControl>
        </>
    )
} 

export default LanguageSelector;