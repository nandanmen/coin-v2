import React from 'react';
import styled from 'styled-components';
import { Plus } from 'styled-icons/boxicons-regular';
import Layout, { MAIN_WIDTH } from 'components/Layout';
import Currency from 'components/Currency';
import Button from 'components/Button';
import BlockLink from 'components/BlockLink';
import { getAccounts, getTotalBalance } from 'utils/mock';
import { getBreakpoint } from 'theme';
import BankCard from './accounts/BankCard';

function Accounts() {
  return (
    <Layout>
      <Heading>Your accounts.</Heading>
      <Mid>
        <LinkWrapper>
          <Spent amount={getTotalBalance()} currency="usd" />
          <p>Total balance</p>
        </LinkWrapper>
        <AddBtn icon={<Plus size="3rem" />} text="Add new card" />
      </Mid>
      <CardsContainer>
        {getAccounts().map(account => (
          <BlockLink key={account.id} to={account.id}>
            <Card {...account} />
          </BlockLink>
        ))}
      </CardsContainer>
    </Layout>
  );
}

export default Accounts;

const Heading = styled.h1`
  font-size: 3.33em;
`;

const Mid = styled.div`
  margin-bottom: 1em;
  @media (min-width: ${getBreakpoint(0)}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const AddBtn = styled(Button)`
  height: 4em;
  padding: 0 1.5em;
  margin-top: 2em;
  @media (min-width: ${getBreakpoint(0)}) {
    margin-top: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

const Card = styled(BankCard)`
  height: 100%;
  width: 100%;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;

  p {
    font-size: 1.5em;
    color: ${({ theme }) => theme.colors.grays.dark};
  }
`;

const Spent = styled(Currency)`
  font-size: 4em;
  @media (min-width: ${getBreakpoint(0)}) {
    font-size: 3em;
  }
`;

const CardsContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  grid-auto-flow: column;
  grid-auto-columns: minmax(21em, 1fr);
  padding-bottom: 1em;
  &:before {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  }
  &:after {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  }
  overflow-x: scroll;

  @media (min-width: ${getBreakpoint(1)}) {
    grid-template-columns: 5em;
    &:before {
      content: '';
      width: 5em;
    }
    &:after {
      content: '';
      width: 5em;
    }
  }
`;
