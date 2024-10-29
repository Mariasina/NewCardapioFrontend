import { Box, Typography } from "@mui/material";
import { CardBox } from "./styles";
import { MenuInfo } from "../..";


export default function MenuCard() {
    return (
        <>
            <CardBox>
                <Typography fontFamily={"Margarine"} color="var(--bg-primary)" variant="h5">Cardápio</Typography>
            </CardBox>
        </>
    )
}