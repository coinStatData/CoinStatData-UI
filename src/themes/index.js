import { createTheme } from '@mui/material/styles';

//TODO: Add a theme switcher to the navbar: dark/light 
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'gold',
    },
  },
});