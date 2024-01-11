import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Line } from '@antv/g2plot';
import { getEmailFromSession } from '../EmailRetrieval';
const LineChart = () => {
  const chartContainer = useRef(null);
  const [chartData, setComplaintData] = useState([]);

  useEffect(() => {
    // Axios GET request to fetch data
    const apiUrl = 'http://localhost:8000/Linechart.php';
    const email = getEmailFromSession();
    
    axios
      .get(apiUrl, { params: { email: email } })
      .then((response) => {
        setComplaintData(response.data.data || []);
        console.log(chartData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    if (chartData.length > 0) {
      const line = new Line(chartContainer.current, {
        data: chartData,
        xField: 'info1',
        yField: 'count',
        label: {

        },
        stepType:'hvh',
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            fill: localStorage.getItem('theme')==='light'?'black':'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
        tooltip: { showMarkers: false },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              stroke: '#000',
              fill: 'red',
            },
          },
        },
        interactions: [{ type: 'marker-active' }],
      });

      line.render();

      // Clean up the instance on unmount or rerender
      return () => {
        line.destroy();
      };
    }
  }, [chartData]);

  return <div ref={chartContainer} />;
};

export default LineChart;
