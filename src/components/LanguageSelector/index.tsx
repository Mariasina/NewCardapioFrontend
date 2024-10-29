import { ImgArrow, ImgFlag, LanguageContainer } from "./styles";
import flag from "../../assets/img/flag-usa.svg"
import flagBR from "../../assets/img/flag-brazil.svg"
import { createTheme, FormControl, InputLabel, MenuItem, Select, Toolbar } from "@mui/material";
import { useState } from "react";
import { amber } from "@mui/material/colors";

function LanguageSelector() {
    const [value, setValue] = useState("br")

    return (
        <>
            <FormControl fullWidth sx={{minWidth: "100px"}}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    variant="standard"

                    sx={{
                        ".MuiSvgIcon-root": {
                            fill: "white"
                        },
                        ':before': { borderBottomColor: '#0C482E' },
                        ':after': { borderBottomColor: 'white' },
                    }}
                >
                    <MenuItem value={"en"}><ImgFlag src={flag}/></MenuItem>
                    <MenuItem value={"br"}><ImgFlag src={flagBR}/></MenuItem>
                </Select>
            </FormControl>
        </>
    )
} 

export default LanguageSelector;