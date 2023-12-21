import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import CryptoJS from 'crypto-js';
const Doughnut = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/doughnet.php';
    const email = getEmailFromCookies();

    axios
      .get(apiUrl, { params: { email: email } })
      .then((response) => {
        const dataFromApi = response.data;
        setChartData(dataFromApi);
        console.log(chartData);
        renderChart(dataFromApi);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const getEmailFromCookies = () => {
    const Email = sessionStorage.getItem('AdminEmail');
    const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  const renderChart = (data) => {
    const myChart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data.map((item) => item.value), // Adjust the property name based on your API response
            backgroundColor: data.map((item) => item.color),
          },
        ],
        labels: data.map((item) => item.label),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Complaint Types',
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const url = data[index].url;
            window.open(url, '_self');
          }
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  };

  return <canvas id="myChart" ref={chartRef} />;
};

export default Doughnut;
