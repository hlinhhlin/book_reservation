import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './customTheme';

ReactDOM.render(
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>,
    document.getElementById('root')
  );
