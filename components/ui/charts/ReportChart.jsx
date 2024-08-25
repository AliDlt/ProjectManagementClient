import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const ReportChart = ({ data }) => {
  const [series, setSeries] = useState([
    {
      name: "گزارش",
      data: [
        { x: "شنبه", y: 0 },
        { x: "یک شنبه", y: 0 },
        { x: "دو شنبه", y: 0 },
        { x: "سه شنبه", y: 0 },
        { x: "چهار شنبه", y: 0 },
        { x: "پنج شنبه", y: 0 },
        { x: "جمعه", y: 0 },
      ],
    },
  ]);

  const updateSeries = (isMobile) => {
    const days = isMobile
      ? ["ش", "ی", "د", "س", "چ", "پ", "ج"]
      : [
          "شنبه",
          "یک شنبه",
          "دو شنبه",
          "سه شنبه",
          "چهار شنبه",
          "پنج شنبه",
          "جمعه",
        ];

    setSeries([
      {
        name: "گزارش",
        data: days.map((day, index) => ({
          x: day,
          y: data ? data[index] || 0 : 0,
        })),
      },
    ]);
  };

  useEffect(() => {
    const handleResize = () => {
      updateSeries(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the correct state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  const options = {
    dataLabels: {
      enabled: false,
    },

    grid: {
      show: false,
    },

    fill: {
      colors: "#15ABFF",
    },
    chart: {
      fontFamily: "estedad",
      toolbar: {
        show: false,
      },
      type: "bar",
    },
    xaxis: {
      type: "category",
      labels: {
        rotate: 0,
        style: {
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
    },
  };

  return (
    <ApexCharts options={options} series={series} type="bar" height={330} />
  );
};

export default ReportChart;
