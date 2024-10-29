import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { ImgLogo, ImgLogout, MenuLink, NavContainer, RightIcons, RightItens } from './styles';
import logo from '../../assets/img/NewCardapio-logo.png';
import LanguageSelector from '../LanguageSelector';
import { Link, useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { useEffect, useState } from "react";
import { Stack } from '@mui/material';


export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { decodedToken, isExpired } = useJwt<JwtPayload>(token ?? "");
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    useEffect(() => {
        if (isExpired || !token) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [isExpired, token, decodedToken, navigate])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <NavContainer position="static">
            <Box>
                <ImgLogo src={logo} alt="Logo" />
            </Box>
            <RightItens>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >

                            <Stack>
                                <MenuLink>
                                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
                                </MenuLink>
                                <MenuLink>
                                    <Link to="/menus" style={{ textDecoration: "none", color: "black" }}>Cardápios</Link>
                                </MenuLink>
                                {decodedToken?.isAdmin && (
                                    <>
                                        <MenuLink>
                                            <Link to="/users" style={{ textDecoration: "none", color: "black" }}>Usuários</Link>
                                        </MenuLink>
                                    </>
                                )}
                            </Stack>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuLink>
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
                        </MenuLink>
                        <MenuLink>
                            <Link to="/menus" style={{ textDecoration: "none", color: "white" }}>Cardápios</Link>
                        </MenuLink>
                        {decodedToken?.isAdmin && (
                            <>
                                <MenuLink>
                                    <Link to="/users" style={{ textDecoration: "none", color: "white" }}>Usuários</Link>
                                </MenuLink>
                            </>
                        )}
                    </Box>
                </Toolbar>
                <RightIcons>
                    <LanguageSelector />
                    <MenuLink sx={{ borderRadius: "50%", aspectRatio: "1/1" }}>
                        <ImgLogout onClick={handleLogout} className="material-symbols-outlined">
                            logout
                        </ImgLogout>
                    </MenuLink>
                </RightIcons>
            </RightItens>
        </NavContainer>
    );
}
