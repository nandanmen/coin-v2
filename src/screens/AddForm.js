import React from 'react';

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
      <div>{formOptions}</div>
      {formComponents[activeForm]}
    </Layout>
  );
}

export default AddForm;
