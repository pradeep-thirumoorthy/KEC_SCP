import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const LineChartComponent = () => {
  const chartRef = useRef(null);
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/SCP/Linechart.php';
    const email = getEmailFromCookies();

    axios
      .get(apiUrl, { params: { email: email } })
      .then((response) => {
        setComplaintData(response.data.data || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Render the chart when the complaintData is available
    if (complaintData.length > 0) {
      renderChart();
    }
  }, [complaintData]);

  const getEmailFromCookies = () => {
    const Email = Cookies.get('AdminEmail');
    const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const renderChart = () => {
    // Extract the last 10 elements from the complaintData
    const lastTenData = complaintData.slice(-10);
    
    const xValues = lastTenData.map((item) => item.info1);
    const yValues = lastTenData.map((item) => item.count);
  
    const myChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [{
          label: "Complaints per day",
          data: yValues,
          borderColor: 'rgba(288, 192, 192, 1)',
          backgroundColor: 'rgba(288, 192, 192, 0.2)',
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        stepped:true,
        title: {
          display: true,
          text: 'Complaints',
        },
      },
    });
  };
  

  return <canvas id="myLineChart" ref={chartRef} style={{ height: "100%", minWidth: "400px", maxWidth: '700px' }}></canvas>;
};

export default LineChartComponent;
