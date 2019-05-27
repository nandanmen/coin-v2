import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Form, Input } from '@narendras/components'
import { actions } from 'state/ducks/budgets'
import Modal from './Modal'

const { Field } = Form
const { Close, Title } = Modal

function CategoryModal({ hideModal, addBudget, ...modalProps }) {
  const inputRef = useRef(null)

  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    const toAdd = {
      name,
      budget
    }
    addBudget(toAdd)
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
      <Title>Add new category</Title>
      <Form onSubmit={handleSubmit}>
        <Field label="name">
          <Input
            value={name}
            onChange={evt => setName(evt.target.value)}
            type="text"
            placeholder="Category name"
            inputRef={inputRef}
          />
        </Field>
        <Field label="budget">
          <Input
            value={budget}
            onChange={evt => setBudget(evt.target.value)}
            type="number"
            placeholder="Budget amount"
          />
        </Field>
      </Form>
      <Button onClick={handleButtonClick} type="submit">
        Add category
      </Button>
    </Modal>
  )
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
  margin-top: 1em;
  outline: none;
  cursor: pointer;
  float: right;
`
