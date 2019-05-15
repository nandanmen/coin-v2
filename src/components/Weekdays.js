import React from 'react';
import styled from 'styled-components';
import { days } from 'utils';

function Weekdays({ className }) {
  return (
    <Container className={className}>
      {days.map(day => (
        <Weekday key={day}>{day.charAt(0)}</Weekday>
      ))}
    </Container>
  );
}

export default Weekdays;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  margin-bottom: 1.5em;
`;

const Weekday = styled.p`
  color: ${({ theme }) => theme.colors.grays.dark};
`;
