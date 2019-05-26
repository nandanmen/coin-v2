import React from 'react'
import styled from 'styled-components'
import { Close } from 'styled-icons/material'
import ReactModal from 'react-modal'
import { getBreakpoint } from 'theme'

ReactModal.setAppElement('#root')

function ModalWrapper({ className, ...props }) {
  const contentClassName = `${className}__content`
  const overlayClassName = `${className}__overlay`
  return (
    <ReactModal
      portalClassName={className}
      overlayClassName={overlayClassName}
      className={contentClassName}
      {...props}
    />
  )
}

const Modal = styled(ModalWrapper)`
  &__content {
    position: relative;
    width: 85%;
    background: white;
    margin: auto;
    outline: none;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding: 3em 4em;
    border-radius: 1em;

    @media (min-width: ${getBreakpoint(0)}) {
      width: 60%;
      padding: 5em;
    }

    @media (min-width: ${getBreakpoint(1)}) {
      width: 50em;
      padding: 5em;
    }
  }

  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
  }
`

const Icon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1.5em;
  right: 1.5em;
`

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 1em;
`

function IconWrapper(props) {
  const { size = '2.5em' } = props
  return (
    <Icon {...props}>
      <Close size={size} />
    </Icon>
  )
}

Modal.Title = Title
Modal.Close = IconWrapper

export default Modal
