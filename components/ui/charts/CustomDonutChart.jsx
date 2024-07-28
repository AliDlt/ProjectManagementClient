import React from "react";
import Chart from "react-apexcharts";

function CustomDonutChart({ colors, data, innerLabel = false }) {
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
          donut: {
            labels: {
              show: innerLabel,
              name: {
                show: false,
              },
              value: {
                color: colors[0],
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                formatter: function (w) {
                  return w.config.series[0];
                },
              },
            },
          },
        },
      },
    },
    series: [data, 100 - data],
  };

  return <Chart series={series} options={options} type="donut" />;
}

export default CustomDonutChart;
