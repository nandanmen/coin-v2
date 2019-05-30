import React, { useState } from 'react'
import styled from 'styled-components'

function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Container
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <Text visible={isVisible}>{text}</Text>
    </Container>
  )
}

export default Tooltip

const Container = styled.div`
  position: relative;
  font-size: 1em;
`

const Text = styled.p`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  transform: translateX(100%);
  right: -100%;
  top: 0;
  background: ${({ theme }) => theme.colors.black}E6;
  border-radius: 0.5rem;
  padding: 0.5em 0.8em;
  color: white;
`
