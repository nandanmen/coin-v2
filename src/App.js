import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import Home from 'screens/Home';
import Accounts from 'screens/Accounts';
import Transactions from 'screens/Transactions';
import Budget from 'screens/Budget';

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
