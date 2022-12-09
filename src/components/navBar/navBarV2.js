import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './navBarV2.css';

const NavBarV2 = () => {

  return (
    <AppBar sx={{ backgroundColor:"#212529"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* ----------------- mid up ----------------- */}
          <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}>
            <img className="nav-bar-logo-md" src="../../assets/CSDLogo3.svg" alt="" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://coinstatdata.com"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBarV2;
