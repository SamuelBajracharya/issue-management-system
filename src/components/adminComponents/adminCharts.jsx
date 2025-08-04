import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export const AdminBarChart = ({issueBarData}) => {
  return (
    <>
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
          <Bar dataKey="count" barSize={150}>
            <Cell fill="var(--bar-color-1)"/>
            <Cell fill="var(--bar-color-2)"/>
            <Cell fill="var(--bar-color-3)"/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export const AdminPieChart = ({issuePieData}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  console.log(issuePieData);
  return (
    <>
      <h3 className="chart-title">Issues Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={300}>
          <Pie
            data={issuePieData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {issuePieData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip/>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};