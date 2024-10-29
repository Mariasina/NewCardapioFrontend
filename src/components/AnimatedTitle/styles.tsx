import { Box } from "@mui/material";
import styled from "styled-components";

export const ListTitleContainer = styled(Box)(({}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    
    position: "relative",
    "&:hover > p::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "green",
        width: "100%",
        height: "2px"
    },
    "p::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "var(--bg-primary)",
        width: "15%",
        height: "2px",
        transition: "400ms",
        left: 0,
        bottom: 0

    }
}))