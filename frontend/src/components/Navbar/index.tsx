import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { ImgLogo, ImgLogout, MenuLink, NavContainer, RightIcons, RightItens } from './styles';
import logo from '../../assets/img/NewCardapio-logo.png';
import LanguageSelector from '../LanguageSelector';

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <NavContainer position="static">
            <Box>
                <ImgLogo src={logo}></ImgLogo>
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
                            <MenuLink>
                                Home
                            </MenuLink>
                            <MenuLink>
                                Cardápios
                            </MenuLink>
                            <MenuLink>
                                Usuários
                            </MenuLink>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MenuLink>
                            Home
                        </MenuLink>
                        <MenuLink>
                            Cardápios
                        </MenuLink>
                        <MenuLink>
                            Usuários
                        </MenuLink>
                    </Box>
                </Toolbar>
                <RightIcons>
                    <LanguageSelector />
                    <MenuLink sx={{borderRadius: "50%", aspectRatio: "1/1"}}>
                        <ImgLogout className="material-symbols-outlined">
                            logout
                        </ImgLogout>
                    </MenuLink>
                </RightIcons>
            </RightItens>
        </NavContainer>
    );
}
export default NavBar;