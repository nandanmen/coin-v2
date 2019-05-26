import React from 'react'
import styled from 'styled-components'
import { Form, Input } from '@narendras/components'
import Modal from './Modal'

const Field = Form.Field

function CategoryModal({ hideModal, ...modalProps }) {
  return (
    <Modal {...modalProps} onRequestClose={hideModal}>
      <Modal.Close onClick={hideModal} />
      <Modal.Title>Add new category</Modal.Title>
      <Form>
        <Field label="name">
          <Input type="text" placeholder="Category name" />
        </Field>
        <Field label="budget">
          <Input type="number" placeholder="Budget amount" />
        </Field>
      </Form>
      <Button onClick={hideModal} type="submit">
        Add category
      </Button>
    </Modal>
  )
}

export default CategoryModal

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
