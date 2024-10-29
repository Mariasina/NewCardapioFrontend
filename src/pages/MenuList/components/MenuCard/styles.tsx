import { Box, styled } from "@mui/material";

export const CardBox = styled(Box)(({}) => ({
    outline: "6px solid var(--bg-primary)",
    width: "190px",
    aspectRatio: "5/3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    margin: "auto 0",
    justifySelf: "center",
    transition: "300ms",
    boxShadow: "none",

    ":hover": {
        transform: "scale(1.05)",
        boxShadow: "3px 3px 15px 5px #80808082"
    }
}))