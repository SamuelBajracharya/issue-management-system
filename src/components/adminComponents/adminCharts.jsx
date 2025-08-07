import React, {useEffect, useState} from 'react'
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
import {useDarkToggleStore} from "../../store/uiStore.js";

export const AdminBarChart = ({issueBarData}) => {

  return (
    <div className="admin-chart">
      <h3 className="chart-title">Summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={issueBarData}>
          <CartesianGrid stroke="var(--extra-color)" strokeDasharray="0 0" vertical={false}/>
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
    </div>
  )
}


export const AdminPieChart = ({issuePieData}) => {
  const isDarkMode = useDarkToggleStore((state) => state.isDarkMode);

  const [colors, setColors] = useState({
    textColor: '',
    titleColor: '',
    tooltipTextColor: '',
    tooltipBgColor: ''
  });

  useEffect(() => {
    const getCssVariable = (name) =>
      getComputedStyle(document.body).getPropertyValue(name).trim();

    requestAnimationFrame(() => {
      setColors({
        textColor: getCssVariable('--text-main'),
        titleColor: getCssVariable('--text-title'),
        tooltipTextColor: getCssVariable('--button-text-bg'),
        tooltipBgColor: getCssVariable('--color-primary'),
      });
    });
  }, [isDarkMode]);

  const COLORS = ['#002454', '#00397e', '#1877f2'];

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
        color: colors.titleColor,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: \n {c} ({d}%)",
      backgroundColor: colors.tooltipBgColor,
      borderRadius: 8,
      textStyle: {
        fontSize: 16,
        fontFamily: "Montserrat, sans-serif",
        color: colors.tooltipTextColor,
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
        color: colors.textColor,
      },
    },
    series: [
      {
        top: -80,
        type: "pie",
        radius: ["0%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {show: false},
        labelLine: {show: false},
        data: chartData
      }
    ]
  };

  return (
    <div className="w-full h-64">
      <ReactECharts
        option={option}
        key={isDarkMode ? "dark" : "light"}
        style={{height: 700}}
      />
    </div>
  );
};
