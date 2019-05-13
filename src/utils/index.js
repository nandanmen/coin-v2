import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

export function withTheme(component) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}
