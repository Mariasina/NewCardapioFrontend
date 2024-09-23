import { Box, Container, Stack, styled } from "@mui/material";

export const ListTitleContainer = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    
    position: "relative",
    ":hover > p::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "green",
        width: "100%",
        height: "2px"
    },
    "p::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "green",
        width: "15%",
        height: "2px",
        transition: "400ms",
        left: 0,
        bottom: 0

    }
}))


export const CardContainer = styled(Box)(({}) => ({
    width: "100%",
    marginTop: "40px",
    display: "grid",
    gap: "50px",
    alignItems: "center",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
}))