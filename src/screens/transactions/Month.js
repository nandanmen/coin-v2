import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'styled-icons/material';
import _ from 'date-fns';

import { getMonthDays } from 'utils';
import Day from 'components/Day';
import Weekdays from 'components/Weekdays';

function Month({ onClick, activeDate }) {
  const [date, setDate] = React.useState(activeDate);
  const days = getMonthDays(date);

  const incrementMonth = () => setDate(_.addMonths(date, 1));
  const decrementMonth = () => setDate(_.subMonths(date, 1));

  return (
    <React.Fragment>
      <Container>
        <IconWrapper onClick={decrementMonth}>
          <KeyboardArrowLeft size="2em" />
        </IconWrapper>
        <h1>{_.format(date, `MMM YY`)}</h1>
        <IconWrapper onClick={incrementMonth}>
          <KeyboardArrowRight size="2em" />
        </IconWrapper>
      </Container>
      <Weekdays />
      <Calendar>
        {days.map((week, index) => (
          <Week key={`w-${index}`}>
            {week.map(weekday => {
              const variant = _.isSameDay(weekday, activeDate)
                ? 'active'
                : _.isSameMonth(weekday, date)
                ? null
                : 'disabled';
              return (
                <Day
                  key={weekday.toISOString()}
                  date={weekday}
                  onClick={onClick}
                  isActive={_.isSameDay(weekday, activeDate)}
                  variant={variant}
                />
              );
            })}
          </Week>
        ))}
      </Calendar>
    </React.Fragment>
  );
}

Month.propTypes = {
  onClick: PropTypes.func,
  activeDate: PropTypes.instanceOf(Date),
  className: PropTypes.string
};

Month.defaultProps = {
  onClick: f => f,
  activeDate: new Date(),
  className: ''
};

export default Month;

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr 90% 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-bottom: 2em;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 1em;
  padding: 0.5em 0;
`;

const Calendar = styled.div`
  width: 100%;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.grays.dark};
  flex: 1;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
