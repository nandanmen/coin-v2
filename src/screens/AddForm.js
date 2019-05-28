import React from 'react'
import styled from 'styled-components'

import Layout from 'components/Layout'
import BackButton from 'components/BackButton'
import { useOptions } from 'utils/hooks'

import AddTransaction from './addForm/AddTransaction'

const formKeys = ['expense', 'income']

function AddForm() {
  const [activeForm, formOptions] = useOptions(0, formKeys)
  return (
    <Layout>
      <BackButton>Back</BackButton>
      <Layout.Heading>Add new {activeForm}</Layout.Heading>
      <Buttons>{formOptions}</Buttons>
      <AddTransaction type={activeForm} />
    </Layout>
  )
}

export default AddForm

const Buttons = styled.div`
  margin-bottom: 1.5em;
`
