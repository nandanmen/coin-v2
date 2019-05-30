import React from 'react'
import styled from 'styled-components'

function Currency({ className, amount, currency }) {
  const [dollar, cents] = Number(amount)
    .toLocaleString('en', {
      style: 'currency',
      currency
    })
    .split('.')
  return (
    <Dollars className={className}>
      {dollar}
      {`.`}
      <Cents>{cents}</Cents>
    </Dollars>
  )
}

export default Currency

const Dollars = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
`

const Cents = styled.span`
  font-weight: 300;
`
