import React, { useRef } from 'react'
import styled from 'styled-components'
import { Form, Input, Radio } from '@narendras/components'
import Modal from './Modal'

const Field = Form.Field

function CardModal({ hideModal, ...modalProps }) {
  const inputRef = useRef(null)
  return (
    <Modal
      {...modalProps}
      onRequestClose={hideModal}
      onAfterOpen={() => inputRef.current.focus()}
    >
      <Modal.Close onClick={hideModal} />
      <Modal.Title>Add new card</Modal.Title>
      <Form>
        <Field label="bank">
          <Input type="text" placeholder="Card issuer" inputRef={inputRef} />
        </Field>
        <Field label="account type">
          <Radio.Group>
            <Radio.Button value="debit">Debit</Radio.Button>
            <Radio.Button value="credit">Credit</Radio.Button>
          </Radio.Group>
        </Field>
        <Field label="card type">
          <Radio.Group>
            <Radio.Button value="visa">Visa</Radio.Button>
            <Radio.Button value="mastercard">Mastercard</Radio.Button>
            <Radio.Button value="amex">Amex</Radio.Button>
          </Radio.Group>
        </Field>
        <Field label="balance">
          <Input type="number" placeholder="Current balance" />
        </Field>
      </Form>
      <Button onClick={hideModal} type="submit">
        Add card
      </Button>
    </Modal>
  )
}

export default CardModal

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
