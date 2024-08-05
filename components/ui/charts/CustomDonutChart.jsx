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
                fontSize: "10px", // Set the font size for the value
                offsetY: 3, // Adjust the vertical alignment
                formatter: function (val) {
                  return `${val}%`; // Add percentage sign to value
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                fontSize: "12px", // Set the font size for the total
                formatter: function (w) {
                  return `${w.config.series[0]}%`; // Add percentage sign to total
                },
                offsetY: 0, // Adjust the vertical alignment
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "130px",
            },
          },
        },
      ],
    },
    series: [data, 100 - data],
  };

  return (
    <div style={{ width: "100%" }} className="flex justify-center items-center">
      <Chart series={series} options={options} type="donut" width="100%" />
    </div>
  );
}

export default CustomDonutChart;
