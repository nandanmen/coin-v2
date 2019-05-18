import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuAltRight } from 'styled-icons/boxicons-regular';
import { Close } from 'styled-icons/material';
import { getBreakpoint } from 'theme';

import Nav from './layout/Nav';

export const MAIN_WIDTH = '23.5em';

function Layout({ children }) {
  const [isNavOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(prev => !prev);
  return (
    <PageWrapper>
      <NavIconWrapper onClick={toggleNav}>
        {isNavOpen ? <Close size="5rem" /> : <MenuAltRight size="5rem" />}
      </NavIconWrapper>
      <Main>{children}</Main>
      <Nav variant={isNavOpen ? 'mobile' : null} />
    </PageWrapper>
  );
}

export default Layout;

const PageWrapper = styled.div`
  display: grid;
  grid-template-rows: 15vh 1fr 15vh;
  grid-template-columns: 1fr;
  width: 100vw;
  min-height: 100vh;
  @media (min-width: ${getBreakpoint(1)}) {
    grid-template-rows: 8vh 1fr 8vh;
    grid-template-columns: minmax(4em, 1fr) minmax(min-content, 60em) minmax(
        4em,
        1fr
      );
    background: #fafbfc;
  }
`;

const Main = styled.main`
  display: grid;
  justify-content: start;
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
  grid-template-columns: 1fr ${MAIN_WIDTH} 1fr;
  grid-auto-rows: min-content;
  > * {
    grid-column: 2 / -2;
  }
  @media (min-width: ${getBreakpoint(0)}) {
    grid-template-columns: 7em 1fr 7em;
  }
  @media (min-width: ${getBreakpoint(1)}) {
    grid-column: 2 / span 1;
    background: ${({ theme }) => theme.colors.white};
    padding: 14vh 0;
    box-shadow: rgba(0, 0, 0, 0.05) 2px 12px 30px 4px,
      rgba(0, 0, 0, 0.03) 3px 8px 5px 0px, rgba(0, 0, 0, 0.08) 2px 3px 4px -2px,
      rgba(10, 20, 50, 0.12) 0px 75px 70px -50px,
      rgb(255, 255, 255) 0px -5px 5px 0px;
  }
`;

const NavIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.black};
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;

  @media (min-width: ${getBreakpoint(1)}) {
    display: none;
  }
`;
