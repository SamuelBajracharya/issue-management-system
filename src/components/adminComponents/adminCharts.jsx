import React from 'react'
import ReactECharts from "echarts-for-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,

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
  const COLORS = ['#434343', '#888888', '#323232'];

  const chartData = issuePieData.map((item, index) => ({
    name: item.status,
    value: item.count,
    itemStyle: {color: COLORS[index % COLORS.length]}
  }));

  const option = {
    title: {
      text: "Issues Breakdown",
      left: 40,
      top: 15,
      textStyle: {
        fontSize: 24,
        fontWeight: 600,
        fontFamily: "Montserrat, sans-serif",
        color: "#000000",

      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: \n {c} ({d}%)",
      backgroundColor: "#323232",
      borderRadius: 8,
      textStyle: {
        fontSize: 16,
        fontFamily: "Montserrat, sans-serif",
        color: "#ffffff",
      }
    },
    legend: {
      bottom: 0,
      left: 50,
      orient: "vertical",
      itemGap: 30,
      itemWidth: 30,
      itemHeight: 20,
      textStyle: {
        fontSize: 24,
        fontFamily: "Montserrat, sans-serif",
        padding: [0, 0, 0, 8],

      },
    },
    series: [
      {
        top: -40,
        type: "pie",
        radius: ["0%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data: chartData
      }
    ]
  };

  return (
    <div className="w-full h-64">
      <ReactECharts option={option} style={{height: 700, width: "100%"}}/>
    </div>
  );
};
