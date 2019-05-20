import React from 'react';
import styled from 'styled-components';

import Layout from 'components/Layout';
import BackButton from 'components/BackButton';
import { useOptions } from 'utils/hooks';

import AddTransaction from './addForm/AddTransaction';
import AddBudget from './addForm/AddBudget';

const formComponents = {
  income: <AddTransaction type="income" />,
  expense: <AddTransaction type="expense" />,
  budget: <AddBudget />
};

const formKeys = ['expense', 'income', 'budget'];

function AddForm() {
  const [activeForm, formOptions] = useOptions(0, formKeys);
  return (
    <Layout>
      <BackButton>Back</BackButton>
      <Layout.Heading>Add new {activeForm}</Layout.Heading>
      <Buttons>{formOptions}</Buttons>
      {formComponents[activeForm]}
    </Layout>
  );
}

export default AddForm;

const Buttons = styled.div`
  margin-bottom: 1.5em;
`;
