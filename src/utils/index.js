import React from 'react';
import { ThemeProvider } from 'styled-components';
import { chunk } from 'lodash';
import _ from 'date-fns';
import theme from 'theme';

export function withTheme(component) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function getWeekday(index, opts) {
  if (opts.initial) return days[index].charAt(0);
  return days[index];
}

function padLeft(date) {
  const dayNum = _.getDay(date);
  let result = [];
  for (let i = 1; i <= dayNum; i++) {
    result.unshift(_.subDays(date, i));
  }
  return result;
}

function padRight(date) {
  const day = _.getDay(date);
  const iters = 6 - day;
  let result = [];
  for (let i = 1; i <= iters; i++) {
    result.push(_.addDays(date, i));
  }
  return result;
}

export function getMonthDays(date) {
  const startOfMonth = _.startOfMonth(date);
  const endOfMonth = _.endOfMonth(date);
  const result = [
    ...padLeft(startOfMonth),
    ..._.eachDay(startOfMonth, endOfMonth),
    ...padRight(endOfMonth)
  ];
  return chunk(result, 7);
}
