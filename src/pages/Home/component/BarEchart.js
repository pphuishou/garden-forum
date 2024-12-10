import React from "react";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function BarEchart({ title }) {
  const chartRef = useRef(null);

  // 图表初始化
  const initChart = () => {
    let chartDom = chartRef.current;
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      title: {
        text: title
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }
  useEffect(() => {
    initChart();
  }, []);
  return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>;
}
