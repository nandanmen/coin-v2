import styled from 'styled-components';
import { string, bool } from 'prop-types';

import { themeGet } from 'theme';

const Title = styled.h1`
  font-size: 1.67em;
  font-weight: 600;
  margin-bottom: 4rem;
`;

const Card = styled.div`
  padding: 6.4vw;
  border-radius: 16px;
  background: ${({ bg }) => themeGet(`colors.${bg}`)};
  color: ${({ color }) => themeGet(`colors.${color}`)};

  ${({ shadow }) => shadow && `box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);`}
`;

Card.propTypes = {
  bg: string,
  color: string,
  shadow: bool
};

Card.defaultProps = {
  bg: 'grays.light',
  color: 'black',
  shadow: false
};

Card.Title = Title;

export default Card;
