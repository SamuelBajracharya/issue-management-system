import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar, Cell
} from "recharts";

const axisColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();


export const UserBarChart = ({issueBarData}) => {
  return (
    <div className="user-chart">
      <h3 className="chart-title">Summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={issueBarData}>
          <CartesianGrid stroke="#eee" strokeDasharray="0 0" vertical={false}/>
          <XAxis dataKey="status"/>
          <YAxis/>
          <Tooltip
            contentStyle={{backgroundColor: '#444', border: 'none'}}
            itemStyle={{color: '#fff'}}
            labelStyle={{color: '#fff'}}
            cursor={false}
          />
          <Bar dataKey="count" barSize={110}>
            <Cell fill="var(--bar-color-1)"/>
            <Cell fill="var(--bar-color-2)"/>
            <Cell fill="var(--bar-color-3)"/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const UserLineChart = ({monthlyIssuesData}) => {
  return (
    <div className="user-chart">
      <h3 className="chart-title">Monthly Report</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyIssuesData}>
          <CartesianGrid stroke="#eee" strokeDasharray="0 0" vertical={false}/>
          <XAxis dataKey="month" tick={{fill: '#333'}}/>
          <YAxis tick={{fill: '#333'}}/>
          <Tooltip
            contentStyle={{backgroundColor: '#444', border: 'none'}}
            itemStyle={{color: '#fff'}}
            labelStyle={{color: '#fff'}}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="issues"
            stroke="var(--color-primary)"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 10,
              fill: 'var(--color-primary)',
              stroke: 'var(--color-primary)',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};