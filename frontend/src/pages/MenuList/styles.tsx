import { Box, Container, styled } from "@mui/material";

export const ListTitleContainer = styled(Box)(({}) => ({
    position: "relative",
    "> p:hover::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "green",
        width: "100%",
        height: "2px"
    },
    "> p::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "green",
        width: "20%",
        height: "2px",
        transition: "400ms",
        left: 0,
        bottom: 0

    }
}))