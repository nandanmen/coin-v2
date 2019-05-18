import React from 'react';
import styled from 'styled-components';
import {
  Home,
  CreditCard,
  Money,
  Plus,
  Wallet
} from 'styled-icons/boxicons-regular';
import BlockLink from 'components/BlockLink';
import { getBreakpoint } from 'theme';

export function generateRoutes(size = '4rem') {
  return {
    '/': <Home size={size} />,
    '/accounts': <CreditCard size={size} />,
    '/budget': <Wallet size={size} />,
    '/transactions': <Money size={size} />
  };
}

function Nav({ variant }) {
  return (
    <NavWrapper variant={variant}>
      {variant === 'mobile' ? null : (
        <Icon to="/" icon={<Plus size="4rem" />} />
      )}
      {Object.entries(generateRoutes()).map(([route, icon]) => (
        <div key={route}>
          <Icon to={route} icon={icon} />
        </div>
      ))}
    </NavWrapper>
  );
}

export default Nav;

const NavWrapper = styled.nav`
  width: 100vw;
  height: 100vh;
  display: ${({ variant }) => (variant === 'mobile' ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  padding: 2em;

  @media (min-width: ${getBreakpoint(1)}) {
    display: flex;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grays.dark};
    min-height: 6em;
    height: auto;
    width: auto;
    padding: 2em 1.5em;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 1rem;
    > * {
      margin-bottom: 1.5em;
      &:last-child {
        margin-bottom: 0;
      }
    }
    right: calc(16px + 368 * ((100vw - 784px) / 1136));
    align-items: center;
  }
`;

const Icon = styled(BlockLink)`
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
