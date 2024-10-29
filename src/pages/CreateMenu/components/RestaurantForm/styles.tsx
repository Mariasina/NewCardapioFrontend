import { styled } from "@mui/material";

export const TitleInputContainer = styled("div")`
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

export const TitleInput = styled("input")`
    background-color: transparent;
    border: 1px solid gray;
    border-radius: 5px;
    font-family: "Margarine";
    font-size: 1.8em;
    color: #115437;
    padding: 5px 5px;

`


export const DescriptionInput = styled("textarea")`
    resize: none;
    background-color: transparent;
    border: None;
    font-family: "Margarine";
    font-size: 1.8em;
    color: #115437;
    padding: 5px 5px;
    outline: none;
    max-height: 300px;
    min-height: 20px;
    height: auto;
    width: auto;
`


