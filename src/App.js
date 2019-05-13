import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import Home from 'pages/Home';
import Accounts from 'pages/Accounts';
import Transactions from 'pages/Transactions';
import Budget from 'pages/Budget';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Home path="/" />
        <Accounts path="accounts" />
        <Budget path="budget" />
        <Transactions path="transactions" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
