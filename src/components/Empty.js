import styled from 'styled-components'

const Empty = styled.section`
  font-size: inherit;
  margin: 5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.grays.dark};
`

const Title = styled.h1``

const Action = styled.button`
  cursor: pointer;
  margin-top: 1em;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`

Empty.Title = Title
Empty.Action = Action

export default Empty
