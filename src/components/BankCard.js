import React from 'react'
import styled from 'styled-components'
import { Mastercard, Visa } from 'styled-icons/boxicons-logos'

import Card from 'components/Card'
import Currency from 'components/Currency'

const types = {
  mastercard: <Mastercard size="6rem" />,
  visa: <Visa size="6rem" />,
  amex: 'AMEX'
}

function BankCard({
  bank,
  accountType,
  cardType,
  balance,
  number,
  color,
  className
}) {
  return (
    <Container color="white" bg={color} className={className}>
      <Header>
        <div>
          <Text>{bank}</Text>
          <Text as="p">{accountType}</Text>
        </div>
        <Balance amount={Number(balance)} currency="usd" />
      </Header>
      <Footer>
        <Type>{types[cardType]}</Type>
        <p>** {number}</p>
      </Footer>
    </Container>
  )
}

export default BankCard

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 2em 3em;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Type = styled.div`
  min-height: 1.5em;
`

const Text = styled.h1`
  text-transform: capitalize;
`

const Balance = styled(Currency)`
  color: ${({ theme }) => theme.colors.white};
`
