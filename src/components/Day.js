import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { isToday } from 'date-fns';

function Day({ date, onClick, variant }) {
  const monthDate = date.getDate();
  const radius = Math.floor(Math.random() * 10) + 5; // temp
  return (
    <Container onClick={() => onClick(date)}>
      <MonthDate isToday={isToday(date)} variant={variant} radius={radius}>
        {monthDate}
      </MonthDate>
    </Container>
  );
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func,
  isActive: PropTypes.bool
};

Day.defaultProps = {
  date: new Date(),
  onClick: f => f,
  isActive: false
};

export default Day;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthDate = styled.p`
  position: relative;
  cursor: pointer;
  font-weight: 500;
  color: ${({ variant, theme }) =>
    variant === 'active'
      ? theme.colors.blue
      : variant === 'disabled'
      ? theme.colors.grays.dark
      : 'inherit'};

  ${({ isToday, theme }) =>
    isToday &&
    css`
      color: ${theme.colors.blue};
      &:after {
        content: '';
        position: absolute;
        width: 180%;
        height: 180%;
        border: 1px solid ${theme.colors.blue};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    `}
`;
