import { Box } from "@mui/material";
import styled from "styled-components";

export const MainPanel = styled(Box)`
    background-color: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms;
    position: relative;
    width: 100%;
    z-index: 10;

    @media screen and (max-width: 900px) {
        background-image: url("/src/assets/img/register-user-img.svg");
        background-size: cover;
        background-position-x: center;

        &::before {
            content: "";
            backdrop-filter: blur(10px);
            width: 100%;
            height: 100%;
            position: absolute;
        }
    }
  
`

export const PicturePanel = styled(Box)`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 900px) {
        display: none;
    }
`

export const RegisterImg = styled('img')`
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 600px;
`