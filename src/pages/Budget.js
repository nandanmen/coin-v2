import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

import Layout from 'components/Layout';

const mock = [
  {
    name: 'Food',
    value: 117.35
  },
  {
    name: 'Groceries',
    value: 24.66
  },
  {
    name: 'Gas',
    value: 50
  }
];

const colors = ['#6D97AA', '#bce8ff', '#f7e6d5'];

function Budget() {
  return (
    <Layout>
      <Heading>Your budget.</Heading>
      <ResponsiveContainer aspect={1} width="100%">
        <PieChart>
          <Pie
            data={mock}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          >
            {mock.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Layout>
  );
}

export default Budget;

const Heading = styled.h1`
  font-size: 3.33em;
`;
