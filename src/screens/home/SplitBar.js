import React, { useMemo } from 'react'
import styled from 'styled-components'
import { arrayOf, shape, string, number } from 'prop-types'

function SplitBar({ amounts }) {
  const total = useMemo(
    () => amounts.reduce((acc, obj) => acc + obj.spent, 0),
    [amounts]
  )
  return (
    <Container>
      {amounts.map(ctg =>
        ctg.spent ? (
          <Section
            key={ctg.name}
            color={ctg.color}
            proportion={ctg.spent / total}
            name={ctg.name}
          />
        ) : null
      )}
    </Container>
  )
}

SplitBar.propTypes = {
  amounts: arrayOf(
    shape({
      name: string,
      amount: number,
      color: string
    })
  ).isRequired
}

export default SplitBar

const Section = styled.div`
  position: relative;
  height: 100%;
  background: ${({ color }) => color};
  flex: ${({ proportion }) => proportion};
  &:after {
    content: '${({ name }) => name}';
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.black};
    position: absolute;
    left: 0;
    bottom: -1.5em;
  }
`

const Container = styled.div`
  display: flex;
  height: 1em;
  width: 100%;
  background: ${({ theme }) => theme.colors.grays.med};
  border-radius: 1em;

  ${Section} {
    &:first-child {
      border-radius: 1em 0 0 1em;
    }
    &:last-child {
      border-radius: 0 1em 1em 0;
    }
    &:only-child {
      border-radius: 1em;
    }
  }
`
