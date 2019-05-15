import React from 'react';
import styled from 'styled-components';
import {
  MenuAltRight,
  Home,
  CreditCard,
  Money,
  Plus,
  Wallet
} from 'styled-icons/boxicons-regular';
import BlockLink from 'components/BlockLink';
import { getBreakpoint } from 'theme';

export const MAIN_WIDTH = '23.5em';

function Layout({ children }) {
  return (
    <PageWrapper>
      <NavIcon size="5rem" />
      <Main>{children}</Main>
      <DesktopNav>
        <Icon to="/" icon={<Plus size="4rem" />} />
        <Icon to="/" icon={<Home size="4rem" />} />
        <Icon to="/accounts" icon={<CreditCard size="4rem" />} />
        <Icon to="/budget" icon={<Wallet size="4rem" />} />
        <Icon to="/transactions" icon={<Money size="4rem" />} />
      </DesktopNav>
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

const NavIcon = styled(MenuAltRight)`
  color: ${({ theme }) => theme.colors.black};
  position: fixed;
  top: 1rem;
  right: 1rem;

  @media (min-width: ${getBreakpoint(1)}) {
    display: none;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grays.dark};
  min-height: 6em;
  padding: 2em 1.5em;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 1rem;
  > * {
    margin-bottom: 1.5em;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: ${getBreakpoint(1)}) {
    right: calc(16px + 368 * ((100vw - 784px) / 1136));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Icon = styled(BlockLink)`
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
