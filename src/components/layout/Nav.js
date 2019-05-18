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

function Nav({ variant }) {
  if (variant === 'mobile') {
    return (
      <MobileNav>
        <Icon key="home" to="/" icon={<Home size="4rem" />}>
          Home
        </Icon>
        <Icon key="accounts" to="/accounts" icon={<CreditCard size="4rem" />}>
          Accounts
        </Icon>
        <Icon key="budget" to="/budget" icon={<Wallet size="4rem" />}>
          Budget
        </Icon>
        <Icon
          key="transactions"
          to="/transactions"
          icon={<Money size="4rem" />}
        >
          Transactions
        </Icon>
      </MobileNav>
    );
  }

  return (
    <NavWrapper>
      <Icon to="/" icon={<Plus size="4rem" />} />
      <Icon key="home" to="/" icon={<Home size="4rem" />} />
      <Icon key="accounts" to="/accounts" icon={<CreditCard size="4rem" />} />
      <Icon key="budget" to="/budget" icon={<Wallet size="4rem" />} />
      <Icon
        key="transactions"
        to="/transactions"
        icon={<Money size="4rem" />}
      />
    </NavWrapper>
  );
}

export default Nav;

const MobileNav = styled.nav`
  background: ${({ theme }) => theme.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3em;
  font-size: 2em;
`;

const NavWrapper = styled.nav`
  display: none;

  @media (min-width: ${getBreakpoint(1)}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  }
`;

const Icon = styled(BlockLink)`
  margin-bottom: 1.5em;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
