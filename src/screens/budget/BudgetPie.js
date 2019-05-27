import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  Label
} from 'recharts'
import { getBudgets } from 'utils/mock'

function renderText(props) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value
  } = props
  return (
    <g>
      <CenterCurrency x={cx} y={cy} dy={0} textAnchor="middle" fill="#333">
        {value.toLocaleString('en', { style: 'currency', currency: 'usd' })}
      </CenterCurrency>
      <GroupLabelText x={cx} y={cy + 32} textAnchor="middle" fill="#888">
        {payload.name}
      </GroupLabelText>
      <CustomSector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  )
}

function renderCenterLabel({ viewBox: { cx, cy }, value }) {
  return (
    <g>
      <CenterCurrency x={cx} y={cy} dy={0} textAnchor="middle" fill="#333">
        {value.toLocaleString('en', { style: 'currency', currency: 'usd' })}
      </CenterCurrency>
      <GroupLabelText x={cx} y={cy + 32} textAnchor="middle" fill="#888">
        Spent so far
      </GroupLabelText>
    </g>
  )
}

function BudgetPie({ budgets = getBudgets(), width = '100%' }) {
  const [isActive, setIsActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const total = budgets.reduce((sum, budget) => sum + budget.spent, 0)

  const handleEnter = (_, index) => {
    setIsActive(true)
    setActiveIndex(index)
  }
  const handleLeave = () => {
    setIsActive(false)
  }

  let data = budgets
  if (!total) {
    data = [
      {
        name: 'No spendings',
        spent: 100,
        color: '#e8e8e8'
      },
      {
        name: '',
        spent: 0,
        color: 'white'
      }
    ]
  }

  return (
    <ResponsiveContainer aspect={1} width={width}>
      <PieChart>
        <Pie
          activeIndex={isActive ? activeIndex : undefined}
          activeShape={total ? renderText : undefined}
          data={data}
          dataKey="spent"
          nameKey="name"
          innerRadius={100}
          outerRadius={120}
          isAnimationActive={false}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          paddingAngle={total ? 4 : 0}
        >
          {data.map(budget => (
            <Cell key={budget.name} fill={budget.color} />
          ))}
          {isActive && total ? null : (
            <Label
              value={total}
              content={renderCenterLabel}
              position="center"
            />
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default BudgetPie

const CenterCurrency = styled.text`
  font-weight: 500;
  font-size: 2.5em;
`

const GroupLabelText = styled.text`
  font-size: 1.2em;
  text-transform: capitalize;
`

const CustomSector = styled(Sector)`
  cursor: pointer;
`
