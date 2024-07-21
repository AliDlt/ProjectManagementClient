import React from "react";
import Chart from "react-apexcharts";

function CustomDonutChart({ colors, data }) {
  const { options, series } = {
    options: {
      colors,
      stroke: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
    },
    series: [data, 100 - data],
  };

  return <Chart series={series} options={options} type="donut" />;
}

export default CustomDonutChart;
