import styled from 'styled-components'

const Input = styled.input`
  font-size: 1em;
  font-family: inherit;
  width: 100%;
  padding: 0.8em 1.2em;
  border: 1px solid ${({ theme }) => theme.colors.grays.med};
  transition: 0.2s border ease-out;
  border-radius: 0.5rem;
  outline: none;
  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`

export default Input
