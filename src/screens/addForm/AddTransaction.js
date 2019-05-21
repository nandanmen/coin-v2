import React, { useState } from 'react';
import styled from 'styled-components';
import { Mastercard, Visa } from 'styled-icons/boxicons-logos';
import { format } from 'date-fns';

import Select from 'components/Select';
import BaseInput from 'components/Input';
import { getBreakpoint } from 'theme';
import { getAccounts } from 'utils/mock';

import CardForm from './addTransaction/CardForm';

const cardLogos = {
  visa: <Visa size="1.5em" />,
  mastercard: <Mastercard size="1.5em" />,
  amex: 'Amex'
};

const mockCards = getAccounts().map(account => {
  return {
    ...account,
    name: [account.bank, account.accountType].join(' ')
  };
});

const mockCategories = ['food', 'groceries', 'gas'];

const buildHandleClick = (fn, ...args) => e => {
  e.preventDefault();
  fn(...args);
};

function AddTransaction({ type }) {
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [card, setCard] = useState(0);
  const [category, setCategory] = useState('');
  const [editingCard, setEditingCard] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);

  return (
    <form>
      <Group>
        <Field htmlFor="vendor">
          Vendor
          <Input
            id="vendor"
            value={vendor}
            onChange={e => setVendor(e.target.value)}
            type="text"
          />
        </Field>
        <Field htmlFor="amount">
          Amount
          <Input
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            type="number"
          />
        </Field>
        <Field htmlFor="date">
          Date
          <Input
            value={date}
            onChange={e => setDate(e.target.value)}
            type="date"
          />
        </Field>
      </Group>
      <Group>
        <SelectWrapper>
          <Select
            suggestions={mockCards}
            onChange={idx => setCard(mockCards[idx].id)}
            placeholder="Select a card"
            searchKey="name"
            label="Account"
          >
            {(option, selected) => (
              <CardOption selected={selected}>
                {cardLogos[option.cardType]}
                <CardInfo>{`${option.bank} ${option.accountType}`}</CardInfo>
                {`**${option.number}`}
              </CardOption>
            )}
          </Select>
          <AddNewBtn onClick={buildHandleClick(setEditingCard, true)}>
            Add new card
          </AddNewBtn>
        </SelectWrapper>
        {type === 'expense' && (
          <SelectWrapper>
            <Select
              suggestions={mockCategories}
              onChange={idx => setCategory(mockCategories[idx])}
              placeholder="Select a category"
              label="Category"
            >
              {(option, selected) => (
                <CardOption selected={selected}>{option}</CardOption>
              )}
            </Select>
            <AddNewBtn onClick={buildHandleClick(setEditingCategory, true)}>
              Add new category
            </AddNewBtn>
          </SelectWrapper>
        )}
      </Group>
      {editingCategory && <h1>Editing category!</h1>}
      {editingCard && <CardForm />}
    </form>
  );
}

export default AddTransaction;

const CardOption = styled.div`
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
  text-transform: capitalize;
`;

const CardInfo = styled.p`
  text-transform: capitalize;
  width: 80%;
  margin: 0 2em;
`;

const Field = styled.label`
  font-size: 1.2em;
  input {
    margin-top: 0.8em;
  }
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${getBreakpoint(0)}) {
    margin-right: 1em;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Input = styled(BaseInput)`
  height: 2.5em;
  border-radius: 0.5rem;
  padding: 0.6em 0.8em;
  border: 1px solid ${({ theme }) => theme.colors.grays.med};
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${getBreakpoint(0)}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SelectWrapper = styled.div`
  flex: 2;
  margin-bottom: 1em;
  &:first-child {
    flex: 3;
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${getBreakpoint(0)}) {
    margin-right: 1em;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const AddNewBtn = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grays.dark};
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
