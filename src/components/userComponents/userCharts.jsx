import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";
import useResponsiveStore from "../../store/responsiveStore.js";

export const UserBarChart = ({issueBarData}) => {
  const isMobile = useResponsiveStore(state => state.isMobile);

  return (
    <div className="user-chart">
      <h3 className="chart-title">Summary</h3>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={issueBarData} barGap={isMobile ? 5 : 20}>
          <CartesianGrid stroke="#eee" strokeDasharray="0 0" vertical={false}/>
          <XAxis dataKey="status"/>
          <YAxis/>
          <Tooltip
            contentStyle={{backgroundColor: '#1877f2', border: 'none'}}
            itemStyle={{color: '#fff'}}
            labelStyle={{color: '#fff'}}
            cursor={false}
          />

          <Bar dataKey="count" barSize={isMobile ? 50 : 110}>
            {issueBarData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`var(--bar-color-${index + 1})`}/>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export const UserLineChart = ({monthlyIssuesData}) => {
  const isMobile = useResponsiveStore(state => state.isMobile);

  return (
    <div className="user-chart">
      <h3 className="chart-title">Monthly Report</h3>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={monthlyIssuesData}>
          <CartesianGrid stroke="#eee" strokeDasharray="0 0" vertical={false}/>
          <XAxis dataKey="month" tick={{fill: '#333'}} interval={isMobile ? 0 : 'preserveEnd'}/>
          <YAxis tick={{fill: '#333'}}/>
          <Tooltip
            contentStyle={{backgroundColor: '#1877f2', border: 'none'}}
            itemStyle={{color: '#fff'}}
            labelStyle={{color: '#fff'}}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="issues"
            stroke="var(--color-primary)"
            strokeWidth={isMobile ? 2 : 4}
            dot={false}
            activeDot={{
              r: isMobile ? 6 : 10,
              fill: 'var(--color-primary)',
              stroke: 'var(--color-primary)',
              strokeWidth: isMobile ? 1 : 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
