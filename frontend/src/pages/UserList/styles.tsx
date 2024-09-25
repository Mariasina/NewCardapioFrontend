import { Box, Container, Stack, styled } from "@mui/material";




export const CardContainer = styled(Box)(({}) => ({
    width: "100%",
    marginTop: "40px",
    display: "grid",
    gap: "50px",
    alignItems: "center",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
}))