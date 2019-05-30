import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Input from 'components/Input'
import { actions } from 'state/ducks/budgets'
import { getBreakpoint } from 'theme'

import Modal from './Modal'

const { Close, Title } = Modal

function CategoryModal({
  hideModal,
  onSubmit,
  addBudget,
  initialState,
  title,
  ...modalProps
}) {
  const inputRef = useRef(null)

  let state = {
    name: '',
    budget: ''
  }
  if (initialState) {
    state = { ...initialState }
  }

  const { name: initialName, budget: initialBudget } = state
  const [name, setName] = useState(initialName)
  const [budget, setBudget] = useState(initialBudget)

  const handleSubmit = evt => {
    evt.preventDefault()
    const toAdd = {
      name,
      budget
    }
    addBudget(toAdd)
    onSubmit(toAdd)
    setName('')
    setBudget('')
  }

  const handleButtonClick = evt => {
    hideModal(evt)
    handleSubmit(evt)
  }

  return (
    <Modal
      {...modalProps}
      onRequestClose={hideModal}
      onAfterOpen={() => inputRef.current.focus()}
    >
      <Close onClick={hideModal} />
      <Title>{title}</Title>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="category">
            Budget Category
            <PosInput
              id="category"
              value={name}
              onChange={evt => setName(evt.target.value)}
              type="text"
              placeholder="Category name"
              ref={inputRef}
            />
          </label>
          <label htmlFor="amount">
            Budget Amount
            <PosInput
              id="amount"
              value={budget}
              onChange={evt => setBudget(evt.target.value)}
              type="number"
              placeholder="Budget amount"
            />
          </label>
        </InputGroup>
        <Button onClick={handleButtonClick} type="submit">
          Add category
        </Button>
      </form>
    </Modal>
  )
}

CategoryModal.defaultProps = {
  onSubmit: () => {},
  title: 'Add new category'
}

export default connect(
  null,
  {
    addBudget: actions.addBudget
  }
)(CategoryModal)

const Button = styled.button`
  padding: 0.5em 1.5em;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5em;
  margin-top: 1.5em;
  outline: none;
  cursor: pointer;
  float: right;
  transition: 0.2s all ease-out;
  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
`

const InputGroup = styled.div`
  width: 100%;
  > * {
    &:first-child input {
      margin-bottom: 1em;
    }
  }

  @media (min-width: ${getBreakpoint(0)}) {
    display: flex;
    justify-content: space-between;
    > * {
      flex-grow: 1;
      &:first-child {
        margin-right: 1em;
        input {
          margin-bottom: 0;
        }
      }
    }
  }
`

const PosInput = styled(Input)`
  margin-top: 1em;
`
