import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const ReportChart = () => {
  const [series, setSeries] = useState([
    {
      name: "گزارش",
      data: [
        { x: "شنبه", y: 20 },
        { x: "یک شنبه", y: 30 },
        { x: "دو شنبه", y: 30 },
        { x: "سه شنبه", y: 10 },
        { x: "چهار شنبه", y: 50 },
        { x: "پنج شنبه", y: 20 },
        { x: "جمعه", y: 30 },
      ],
    },
  ]);

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
        show: false, // Hide the toolbar
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
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSeries([
          {
            name: "گزارش",
            data: [
              { x: "ش", y: 20 },
              { x: "ی", y: 30 },
              { x: "د", y: 30 },
              { x: "س", y: 10 },
              { x: "چ", y: 50 },
              { x: "پ", y: 20 },
              { x: "ج", y: 30 },
            ],
          },
        ]);
      } else {
        setSeries([
          {
            name: "گزارش",
            data: [
              { x: "شنبه", y: 20 },
              { x: "یک شنبه", y: 30 },
              { x: "دو شنبه", y: 30 },
              { x: "سه شنبه", y: 10 },
              { x: "چهار شنبه", y: 50 },
              { x: "پنج شنبه", y: 20 },
              { x: "جمعه", y: 30 },
            ],
          },
        ]);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the correct state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ApexCharts options={options} series={series} type="bar" height={330} />
  );
};

export default ReportChart;
