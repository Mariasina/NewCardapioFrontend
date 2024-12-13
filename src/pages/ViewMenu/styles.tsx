import { styled } from "@mui/material";

export const TitleContainer = styled("div")`
    width: fit-content;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        width: 95%;
        margin: 0 auto;
        right: 0;
        left: 0;
        background-color: #CCA67F;
        height: 10px;
        bottom: 0;
        z-index: -1
    }    
`

export const Title = styled("p")`
    background-color: transparent;
    border-radius: 5px;
    font-family: "Margarine";
    font-size: 1.8rem;
    color: #115437;
    padding: 5px 5px;

`
export const FoodIcon = styled("img")`
    width: 17px;
    height: 17px;
`


