import React from 'react';
import styled from 'styled-components';
import { Radio, Input } from '@narendras/components';
import { getBreakpoint } from 'theme';

function CardForm() {
  return (
    <form>
      <Group>
        Bank
        <Input id="bank" />
        Account type
        <Input id="account-type" />
        Card type
        <Input id="card-type" />
      </Group>
      <Radio.Group>
        <Radio.Button value="debit">Debit</Radio.Button>
        <Radio.Button value="credit">Credit</Radio.Button>
      </Radio.Group>
    </form>
  );
}

export default CardForm;

/* const Input = styled(BaseInput)`
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
`; */

const Field = styled.label`
  font-size: 1.2em;
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

const Group = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${getBreakpoint(0)}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
