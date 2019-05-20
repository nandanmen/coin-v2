/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from 'styled-icons/material';
import PropTypes from 'prop-types';

import Input from './Input';

/*
state shape:
{
  searchVal: string
  selected: number
  isOpen: bool
}
*/

const selectReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'UPDATE':
      return { ...state, searchVal: action.payload };
    case 'SELECT':
      return { isOpen: false, searchVal: '', selected: action.payload };
    default:
      throw new Error('Invalid action type');
  }
};

function Select(props) {
  const input = useRef(null);
  const blurTimeout = useRef(null);

  const initialState = { isOpen: false, searchVal: '', selected: null };
  const [state, dispatch] = useReducer(selectReducer, initialState);

  useEffect(() => {
    if (state.isOpen && input.current) input.current.focus();
  }, [state.isOpen]);

  const { onChange } = props;
  useEffect(() => {
    if (state.selected) onChange(state.selected);
  }, [state.selected, onChange]);

  const { searchKey } = props;
  const suggestions = props.suggestions.filter(suggestion => {
    const searchVal = state.searchVal.toLowerCase();
    let searchee = searchKey ? suggestion[searchKey] : suggestion;
    searchee = searchee.toLowerCase();
    return searchee.indexOf(searchVal) >= 0;
  });

  const handleChange = e =>
    dispatch({
      type: 'UPDATE',
      payload: e.target.value
    });

  const handleBlur = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    blurTimeout.current = setTimeout(() => {
      if (!state.searchVal) return dispatch({ type: 'CLOSE' });
      dispatch({
        type: 'SELECT',
        payload: props.suggestions.indexOf(suggestions[0])
      });
    }, 10);
  };

  const placeholder =
    typeof state.selected === 'number'
      ? props.suggestions[state.selected][searchKey] ||
        props.suggestions[state.selected]
      : props.placeholder;

  const { label, children } = props;
  return (
    <Wrapper
      onClick={() => dispatch({ type: 'OPEN' })}
      className={props.className}
    >
      {label && <LabelName>{label}</LabelName>}
      <InputWrapper>
        {state.isOpen || typeof state.selected !== 'number' ? (
          <Label htmlFor="search">
            <Input
              label="accounts"
              type="text"
              name="search"
              value={state.searchVal}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!state.isOpen}
              placeholder={placeholder}
              ref={input}
            />
          </Label>
        ) : (
          children(props.suggestions[state.selected], true)
        )}
        <Icon>
          {state.isOpen ? (
            <KeyboardArrowUp size="1em" />
          ) : (
            <KeyboardArrowDown size="1em" />
          )}
        </Icon>
      </InputWrapper>
      {state.isOpen ? (
        <Dropdown>
          {suggestions &&
            suggestions.length &&
            suggestions.map((suggestion, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <Option
                key={suggestion[searchKey] || suggestion}
                onClick={() =>
                  dispatch({
                    type: 'SELECT',
                    payload: index
                  })
                }
              >
                {children(suggestion, state.selected === index)}
              </Option>
            ))}
        </Dropdown>
      ) : null}
    </Wrapper>
  );
}

Select.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  searchKey: PropTypes.string
};

export default Select;

const Wrapper = styled.div`
  font-size: 1.2em;
  margin: 1em 0;
  position: relative;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.6em 0.8em;
  border: 1px solid ${({ theme }) => theme.colors.grays.med};
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

const LabelName = styled.p`
  margin-bottom: 0.8em;
`;

const Label = styled.label`
  flex-grow: 1;
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.colors.grays.dark};
  font-size: 1.8em;
  display: flex;
  align-items: center;
  margin-left: 1.5em;
`;

const Option = styled.li`
  cursor: pointer;
`;

const Dropdown = styled.ul`
  width: 100%;
  border-radius: 0.5rem;
  padding: 1em;
  list-style: none;
  position: absolute;
  bottom: -0.8em;
  transform: translateY(100%);
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;
