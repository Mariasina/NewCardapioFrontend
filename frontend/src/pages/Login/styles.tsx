import { Container, styled } from "@mui/material";

export const GreenPanel = styled(Container)`
    background-color: var(--bg-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 300ms;
    position: relative;

    @media screen and (max-width: 900px) {
        background-image: url("/src/assets/img/LoginImg.svg");
        background-size: cover;
        background-position-x: center;

        ::before {
            content: "";
            backdrop-filter: blur(10px);
            width: 100%;
            height: 100%;
            position: absolute;
        }
    }

`

export const LoginImage = styled('img')`
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;

    @media screen and (max-width: 900px) {
        display:none
    }
`
