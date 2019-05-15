import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'date-fns';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'styled-icons/material';

import Day from 'components/Day';
import Weekdays from 'components/Weekdays';

function Week({ onClick, activeDate, className }) {
  const [date, setDate] = React.useState(new Date());
  const days = _.eachDay(_.startOfWeek(date), _.endOfWeek(date));

  const incrementWeek = () => setDate(_.addWeeks(date, 1));
  const decrementWeek = () => setDate(_.subWeeks(date, 1));

  return (
    <React.Fragment>
      <Container>
        <IconWrapper onClick={decrementWeek}>
          <KeyboardArrowLeft size="2em" />
        </IconWrapper>
        <h1>{_.format(date, `MMM YY`)}</h1>
        <IconWrapper onClick={incrementWeek}>
          <KeyboardArrowRight size="2em" />
        </IconWrapper>
      </Container>
      <Weekdays />
      <DaysContainer className={className}>
        {days.map(day => {
          const variant = _.isSameDay(day, activeDate) ? 'active' : null;
          return (
            <Day
              key={day.toISOString()}
              date={day}
              onClick={onClick}
              variant={variant}
            />
          );
        })}
      </DaysContainer>
    </React.Fragment>
  );
}

Week.propTypes = {
  onClick: PropTypes.func,
  activeDate: PropTypes.instanceOf(Date),
  className: PropTypes.string
};

Week.defaultProps = {
  onClick: f => f,
  activeDate: new Date(),
  className: ''
};

export default Week;

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr 90% 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-bottom: 2em;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin-bottom: 1em;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.grays.dark};
  flex: 1;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
