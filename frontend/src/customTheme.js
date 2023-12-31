// customTheme.js
import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: 'Sarabun, sans-serif',
  },
  palette: {
    primary: {
      main: '#FF9800',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EFBA00',
    }
  },
});

export default customTheme;
