import React, { useState } from 'react';

function AddTransaction({ type }) {
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString());
  const [card, setCard] = useState(0);
  const [category, setCategory] = useState('food');

  return (
    <form>
      <label htmlFor="vendor">
        Vendor
        <input
          id="vendor"
          value={vendor}
          onChange={e => setVendor(e.target.value)}
          type="text"
        />
      </label>
      <label htmlFor="amount">
        Amount
        <input
          id="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
        />
      </label>
      <label htmlFor="date">
        Date
        <input
          value={date}
          onChange={e => setDate(e.target.value)}
          type="date"
        />
      </label>
    </form>
  );
}

export default AddTransaction;
