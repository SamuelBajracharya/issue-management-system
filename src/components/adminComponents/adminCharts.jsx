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
import useResponsiveStore from "../../store/responsiveStore.js";

export const AdminBarChart = ({issueBarData}) => {
  const isMobile = useResponsiveStore(state => state.isMobile);

  return (
    <div className="admin-chart">
      <h3 className="chart-title">Summary</h3>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={issueBarData} barGap={isMobile ? 5 : 20}>
          <CartesianGrid stroke="var(--extra-color)" strokeDasharray="0 0" vertical={false}/>
          <XAxis dataKey="status"/>
          <YAxis/>
          <Tooltip
            contentStyle={{backgroundColor: `var(--color-primary)`, border: 'none'}}
            itemStyle={{color: '#fff'}}
            labelStyle={{color: '#fff'}}
            cursor={false}
            wrapperStyle={{zIndex: 9999}}
          />
          <Bar dataKey="count" barSize={isMobile ? 50 : 150}>
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
  const isMobile = useResponsiveStore((state) => state.isMobile);

  const [colors, setColors] = useState({
    textColor: "",
    titleColor: "",
    tooltipTextColor: "",
    tooltipBgColor: "",
  });

  useEffect(() => {
    const getCssVariable = (name) =>
      getComputedStyle(document.body).getPropertyValue(name).trim();

    requestAnimationFrame(() => {
      setColors({
        textColor: getCssVariable("--text-main"),
        titleColor: getCssVariable("--text-title"),
        tooltipTextColor: getCssVariable("--button-text-bg"),
        tooltipBgColor: getCssVariable("--color-primary"),
      });
    });
  }, [isDarkMode]);

  const COLORS = ["#22D3EE", "#FBBF24", "#7C3AED"];

  const chartData = issuePieData.map((item, index) => ({
    name: item.status,
    value: item.count,
    itemStyle: {color: COLORS[index % COLORS.length]},
  }));

  const option = {
    title: {
      text: "Issues Breakdown",
      left: isMobile ? "center" : 40,
      top: 15,
      textStyle: {
        fontSize: isMobile ? 18 : 24,
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
        fontSize: 14,
        fontFamily: "Montserrat, sans-serif",
        color: colors.tooltipTextColor,
      },
    },
    legend: {
      bottom: 0,
      left: isMobile ? "center" : 50,
      orient: isMobile ? "horizontal" : "vertical",
      itemGap: isMobile ? 15 : 30,
      itemWidth: 20,
      itemHeight: 14,
      textStyle: {
        fontSize: isMobile ? 14 : 24,
        fontFamily: "Montserrat, sans-serif",
        padding: [0, 0, 0, 8],
        color: colors.textColor,
      },
    },
    series: [
      {
        top: isMobile ? -20 : -80,
        type: "pie",
        radius: isMobile ? ["0%", "60%"] : ["0%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {show: false},
        labelLine: {show: false},
        data: chartData,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <ReactECharts
        option={option}
        key={isDarkMode ? "dark" : "light"}
        style={{height: isMobile ? 400 : 700}}
      />
    </div>
  );
};
