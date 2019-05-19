/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowRight } from 'styled-icons/material';
import Layout, { MAIN_WIDTH } from 'components/Layout';
import BlockLink from 'components/BlockLink';
import Currency from 'components/Currency';
import SpendingInfo from './home/SpendingInfo';
import BudgetInfo from './home/BudgetInfo';
import { getTodayInfo, getTotalBalance, getBudgets } from 'utils/mock';
import { getBreakpoint } from 'theme';

function Home() {
  return (
    <Layout>
      <Layout.Heading>Welcome.</Layout.Heading>
      <NumbersContainer>
        <NumberSummary
          to="/transactions"
          icon={<Icon size="3em" title="Go to today page" />}
        >
          <LinkWrapper>
            <Spent amount={getTodayInfo().spent} currency="usd" />
            <p>Today's spendings</p>
          </LinkWrapper>
        </NumberSummary>
        <NumberSummary
          to="/accounts"
          icon={<Icon size="3em" title="Go to accounts page" />}
        >
          <LinkWrapper>
            <Spent amount={getTotalBalance()} currency="usd" />
            <p>Total balance</p>
          </LinkWrapper>
        </NumberSummary>
      </NumbersContainer>
      <BudgetContainer budgets={getBudgets()} />
      <SpendingInfo />
    </Layout>
  );
}

export default Home;

const NumberSummary = styled(BlockLink)`
  margin-bottom: 1.5em;
  &:last-child {
    margin-bottom: 0;
  }
`;

const NumbersContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${getBreakpoint(0)}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    ${NumberSummary} {
      margin-bottom: 0;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

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

const Icon = styled(KeyboardArrowRight)`
  color: ${({ theme }) => theme.colors.grays.dark};
`;

const BudgetContainer = styled(BudgetInfo)`
  margin: 3em 0;
  grid-column: 1 / -1;
  display: grid;
  grid-gap: 1.5em;
  grid-template-columns: calc(((100vw - ${MAIN_WIDTH}) / 2) - 1.5em);
  grid-auto-flow: column;
  grid-auto-columns: minmax(14.25em, 1fr);
  overflow-x: scroll;

  &:after {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 1.5em);
  }

  &:before {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 1.5em);
  }

  @media (min-width: ${getBreakpoint(0)}) {
    grid-column: 2 / -2;
    grid-template-columns: repeat(2, minmax(14.25em, 1fr)) 1fr;
    &:after {
      content: none;
    }

    &:before {
      content: none;
    }
    overflow-x: initial;
  }
`;
