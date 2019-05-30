import React from 'react'
import styled from 'styled-components'
import Icon from 'components/Icon'

function getDisplayAmount(type, amount) {
  const opts = { style: 'currency', currency: 'usd' }
  const result = Number(amount).toLocaleString('en', opts)
  return type === 'expense' ? result : `+${result}`
}

function Transaction(props) {
  const { type, vendor, amount, account, budget } = props
  const { bank, accountType } = account
  const displayAmount = getDisplayAmount(type, amount)
  return (
    <Container>
      <Icon variant={budget} />
      <Info>
        <Vendor>{vendor}</Vendor>
        <p>{[bank, accountType].join(' ')}</p>
      </Info>
      <Amount>{displayAmount}</Amount>
    </Container>
  )
}

export default Transaction

const Container = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5em;
`

const Info = styled.div`
  margin-left: 4em;
  margin-right: auto;
  p {
    text-transform: capitalize;
  }
`

const Vendor = styled.h1`
  font-size: 1.5em;
  text-transform: capitalize;
`

const Amount = styled.p`
  font-size: 1.2em;
  font-weight: 500;
`
