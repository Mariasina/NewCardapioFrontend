import { AppBar, Box, MenuItem} from "@mui/material";
import styled from "styled-components";

export const MenuLink = styled(MenuItem)`
    font-family: "Marcellus" !important;
`

export const NavContainer = styled(AppBar)`
    background-color: #115437 !important;
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    padding: 3px 10px;
`

export const RightItens = styled(Box)`
    display: flex;
    gap: 30px;
`

export const ImgLogo = styled('img')`
    width: 100px;
`

export const ImgLogout = styled('span')`
    font-size: 30px;
`

export const RightIcons = styled('div')`
    display: flex;
    width: 27%;
    align-items: center;
    gap: 20px;
`



