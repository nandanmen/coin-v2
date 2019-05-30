import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Form, Input, Radio } from '@narendras/components'
import { actions } from 'state/ducks/accounts'
import Modal from './Modal'

const { Field } = Form

const handleChange = fn => evt => {
  evt.preventDefault()
  fn(evt.target.value)
}

function CardModal({ hideModal, addAccount, initialState, ...modalProps }) {
  const inputRef = useRef(null)

  let state = {
    bank: '',
    accountType: 'debit',
    limit: '',
    cardType: 'visa',
    balance: '',
    number: ''
  }
  if (initialState) {
    state = { ...initialState }
  }
  const {
    bank: initialBank,
    accountType: initialAccount,
    limit: initialLimit,
    cardType: initialCard,
    balance: initialBalance,
    number: initialNumber
  } = state

  const [bank, setBank] = useState(initialBank)
  const [accountType, setAccountType] = useState(initialAccount)
  const [limit, setLimit] = useState(initialLimit)
  const [cardType, setCardType] = useState(initialCard)
  const [balance, setBalance] = useState(initialBalance)
  const [number, setNumber] = useState(initialNumber)

  const handleSubmit = evt => {
    evt.preventDefault()
    const account = {
      bank,
      accountType,
      limit,
      cardType,
      balance,
      number
    }
    addAccount(account)
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
      <Modal.Close onClick={hideModal} />
      <Modal.Title>Add new card</Modal.Title>
      <Form onSubmit={handleSubmit}>
        <Field label="bank">
          <Input
            type="text"
            value={bank}
            onChange={handleChange(setBank)}
            placeholder="Card issuer"
            inputRef={inputRef}
          />
        </Field>
        <Field label="account type">
          <Radio.Group
            value={accountType}
            onChange={handleChange(setAccountType)}
          >
            <Radio.Button value="debit">Debit</Radio.Button>
            <Radio.Button value="credit">Credit</Radio.Button>
          </Radio.Group>
        </Field>
        {accountType === 'credit' ? (
          <Field label="limit">
            <Input
              type="number"
              placeholder="Credit card limit"
              value={limit}
              onChange={handleChange(setLimit)}
            />
          </Field>
        ) : null}
        <Field label="card type">
          <Radio.Group value={cardType} onChange={handleChange(setCardType)}>
            <Radio.Button value="visa">Visa</Radio.Button>
            <Radio.Button value="mastercard">Mastercard</Radio.Button>
            <Radio.Button value="amex">Amex</Radio.Button>
          </Radio.Group>
        </Field>
        <Field label="balance">
          <Input
            type="number"
            placeholder="Current balance"
            value={balance}
            onChange={handleChange(setBalance)}
          />
        </Field>
        <Field label="card number">
          <Input
            type="number"
            placeholder="Last 4 digits only"
            value={number}
            onChange={handleChange(setNumber)}
          />
        </Field>
      </Form>
      <Button onClick={handleButtonClick} type="submit">
        Add card
      </Button>
    </Modal>
  )
}

export default connect(
  null,
  {
    addAccount: actions.addAccount
  }
)(CardModal)

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
