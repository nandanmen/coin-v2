import React, { useState } from 'react';
import styled from 'styled-components';
import { Mastercard, Visa } from 'styled-icons/boxicons-logos';
import { Form, Select, Input, Radio } from '@narendras/components';
import { format } from 'date-fns';
import { getBreakpoint } from 'theme';
import { getAccounts } from 'utils/mock';

const cardLogos = {
  visa: <Visa size="1.5em" />,
  mastercard: <Mastercard size="1.5em" />,
  amex: 'Amex'
};

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

  return <div />;
}

export default AddTransaction;
