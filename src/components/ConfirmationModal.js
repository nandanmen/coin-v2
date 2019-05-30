import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'

const { Title, Close } = Modal

function ConfirmationModal({
  onClose,
  onCancel,
  onConfirm,
  children,
  ...modalProps
}) {
  const makeHandler = (cb, ...args) => evt => {
    evt.preventDefault()
    onClose()
    if (cb) cb(...args)
  }

  return (
    <Wrapper {...modalProps} onRequestClose={onClose}>
      <Close onClick={onClose} />
      {children}
      <div>
        <Cancel onClick={makeHandler(onCancel)}>Cancel</Cancel>
        <Confirm onClick={makeHandler(onConfirm)}>Confirm</Confirm>
      </div>
    </Wrapper>
  )
}

const Message = styled.p`
  margin-bottom: 1.5em;
`

ConfirmationModal.Title = Title
ConfirmationModal.Message = Message

export default ConfirmationModal

const Wrapper = styled(Modal)`
  width: 10em;
`

const Confirm = styled.button`
  cursor: pointer;
  padding: 0.6em 1em;
  background: ${({ theme }) => theme.colors.red};
  border-radius: 0.5rem;
  color: white;
`

const Cancel = styled(Confirm)`
  background: ${({ theme }) => theme.colors.grays.light};
  color: ${({ theme }) => theme.colors.grays.dark};
  margin-right: 1em;
`
