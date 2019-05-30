import React from 'react'
import styled from 'styled-components'
import { Restaurant, Cart } from 'styled-icons/boxicons-regular'

const iconVariants = {
  food: Restaurant,
  groceries: Cart
}

function Icon({ variant, size, className }) {
  const key = variant.toLowerCase()
  const Variant = iconVariants[key]
  return (
    <Container className={className}>
      {Variant ? <Variant size={size} /> : variant}
    </Container>
  )
}

export default Icon

const Container = styled.div`
  width: 2em;
  height: 2em;
`
