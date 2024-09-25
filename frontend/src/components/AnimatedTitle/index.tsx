import { Typography } from "@mui/material";
import { ListTitleContainer } from "./styles";

function AnimatedTitle({ title }: { title: string }) {
    return (
        <>
            <ListTitleContainer>
                <Typography fontFamily={"Marcellus"} fontSize={"1.1rem"}>{title}</Typography>
            </ListTitleContainer>
        </>
    )
}

export default AnimatedTitle;