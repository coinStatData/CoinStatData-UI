import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import useNavMenu from '../../hooks/useNavMenu';
import './navBarV2.css';

const PAGES_LG = ['Statistic', 'Portfolio-Opt', 'Crypto-API', 'Store'];
const PAGES_SM = ['Statistic', 'Portfolio-Opt', 'Crypto-API', 'Store'];

const NavBarV2 = () => {

  const { anchorElNav, handleOpenNavMenu, handleCloseNavMenu } = useNavMenu();

  return (
    <AppBar sx={{ backgroundColor:"#212529"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* ----------------- mid up ----------------- */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img className="nav-bar-logo-md" src="../../assets/CSDLogo33.png" alt="" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://coinstatdata.com"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#bd971b !important'
              },
              letterSpacing: "-1px"
            }}
          >
            CoinStatData
          </Typography>

          {/* ----------------- x small ----------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu-dropdown"
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {PAGES_SM.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://coinstatdata.com"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: '#bd971b !important'
              },
              letterSpacing: "-1px"
            }}
          >
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 5 }}>
              <img className="nav-bar-logo-sm" src="../../assets/CSDLogo33.png" alt="" />
            </Box>
          </Typography>

          {/* ----------------- mid up ----------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES_LG.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my:2, color:'#ced4da', display:'block', '&:hover':{color:'#bd971b !important'}}}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBarV2;
