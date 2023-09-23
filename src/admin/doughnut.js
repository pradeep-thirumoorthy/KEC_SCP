import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Doughnut = () => {
  const chartRef = useRef(null);

  const chartData = [
    {
      label: "Classroom",
      value: 55,
      color: "red",
      url: "http://localhost:3000/admin/Complaintsview#classroom",
    },
    {
      label: "Academic",
      value: 49,
      color: "gold",
      url: "http://localhost:3000/admin/Complaintsview#Academic",
    },
    {
      label: "Restroom",
      value: 44,
      color: "blueviolet",
      url: "http://localhost:3000/admin/Complaintsview#Restroom",
    },
    {
      label: "Sanitation",
      value: 24,
      color: "chocolate",
      url: "http://localhost:3000/admin/Complaintsview#Sanitation",
    },
    {
      label: "Others",
      value: 15,
      color: "green",
      url: "http://localhost:3000/admin/Complaintsview#Others",
    },
  ];

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: chartData.map((data) => data.value),
            backgroundColor: chartData.map((data) => data.color),
          },
        ],
        labels: chartData.map((data) => data.label),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Averages',
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const url = chartData[index].url;
            window.open(url, '_self');
          }
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  });

  return <canvas id="myChart" ref={chartRef} />;
};

export default Doughnut;
