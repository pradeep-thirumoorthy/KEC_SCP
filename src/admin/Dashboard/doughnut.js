import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { G2, Pie } from '@antv/g2plot';
import { useNavigate } from 'react-router-dom';
import { getEmailFromSession } from '../EmailRetrieval';

G2.registerInteraction('conversion-tag-cursor', {
  start: [{ trigger: 'conversion-tag-group:mouseenter', action: 'cursor:pointer' }],
  end: [{ trigger: 'conversion-tag-group:mouseleave', action: 'cursor:default' }],
});

const DoughnutChart = ({ data }) => {
  const chartRef = React.useRef(null);
 const navigate = useNavigate();
  useEffect(() => {
    const donutPlot = new Pie(chartRef.current, {
      data: data.map(item => ({ type: item.label, value: item.value, url: item.url })), // Assuming your data structure contains 'label', 'value', and 'url' properties
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      innerRadius: 0.6,
      label: {
        type: 'outer',
        formatter: (datum) => {
          return `${datum.type}->${datum.value}`; // Custom HTML tag as label content
        },
        style: {
          textAlign: 'center',
        },
      },
      legend: true,
      interactions: [
        { type: 'element-selected' }, { type: 'element-active' },
        {
          type: 'conversion-tag-cursor',
          cfg: {
            start: [
              {
                trigger: 'conversion-tag-group:mouseenter',
                action: (context) => {
                },
              },
            ],
          },
        },
      ],
    });

    donutPlot.render();

    donutPlot.on('element:dblclick', (evt) => {
      const { data } = evt;
      console.log(data.data.url);
      navigate('/admin/Complaints',{ state: { Filter: data.data.url } });
    });

    return () => {
      donutPlot.destroy();
    };
  }, [data, navigate]);

  return <div ref={chartRef} />;
};

const YourComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/Admin/Dashboard/donut.php';
    const email = getEmailFromSession();

    axios
      .get(apiUrl, { params: { email } })
      .then((response) => {
        const dataFromApi = response.data;
        setChartData(dataFromApi);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <DoughnutChart data={chartData} />
    </div>
  );
};

export default YourComponent;
