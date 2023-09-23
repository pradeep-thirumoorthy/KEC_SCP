import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LineChartComponent = () => {
  const chartRef = useRef(null);

  const xValues = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
  const yValues = [55, 20, 44, 4, 15, 23, 12];

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: "Complaints per month",
          data: yValues,
          borderColor: 'rgba(288, 192, 192, 1)',
          backgroundColor: 'rgba(288, 192, 192, 0.2)',
          fill: true,
        }],
      },
      options: {
        responsive: true, // Disable the default responsiveness
        maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
        title: {
          display: true,
          text: 'Line Chart Example',
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [xValues, yValues]);

  return <canvas id="myLineChart" ref={chartRef} style={{height:"100%",minWidth:"400px",maxWidth:'700px'}}></canvas>;
};

export default LineChartComponent;
