import React from 'react';
import styled from 'styled-components';
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import { themeGet } from 'theme';

function buildData(budget, spent) {
  const percentage = (spent / budget) * 100;
  return [
    {
      name: 1,
      value: percentage
    },
    {
      name: 2,
      value: 100 - percentage
    }
  ];
}

function renderCenterLabel({ viewBox: { cx, cy }, value }) {
  const { budget, spent } = value;
  return (
    <g>
      <CenterCurrency x={cx} y={cy} dy={0} textAnchor="middle" fill="#333">
        {spent.toLocaleString('en', { style: 'currency', currency: 'usd' })}
      </CenterCurrency>
      <GroupLabelText x={cx} y={cy + 32} textAnchor="middle" fill="#888">
        {budget.toLocaleString('en', { style: 'currency', currency: 'usd' })}
      </GroupLabelText>
    </g>
  );
}

function BudgetProgress({ budget, spent }) {
  const data = buildData(budget, spent);
  const blue = themeGet('colors.blue');
  const gray = themeGet('colors.grays.med');
  return (
    <ResponsiveContainer aspect={1} width="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={100}
          outerRadius={120}
          startAngle={90}
          endAngle={360 + 90}
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((val, index) => (
            <Cell key={val.name} fill={index ? gray : blue} />
          ))}
          <Label
            value={{ budget, spent }}
            content={renderCenterLabel}
            position="center"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default BudgetProgress;

const CenterCurrency = styled.text`
  font-weight: 500;
  font-size: 2.5em;
`;

const GroupLabelText = styled.text`
  font-size: 1.2em;
  text-transform: capitalize;
`;
