import React, { useState, useEffect } from 'react';
import { Column } from '@antv/g2plot';
import axios from 'axios';
import { geteduEmailFromSession } from '../Emailretrieval';

const DashChart = () => {
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/Complaint.php?email=${geteduEmailFromSession()}`);
        const data = response.data.data;
        if (data) {
          setComplaintData(data);
        }
      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (complaintData.length > 0) {
      const transformedData = complaintData.map((item) => ({
        Type: item.Type,
        status: 'Arrived',
        count: item.Arrived,
      })).concat(
        complaintData.map((item) => ({
          Type: item.Type,
          status: 'Resolved',
          count: item.Resolved,
        })),
        complaintData.map((item) => ({
          Type: item.Type,
          status: 'Accepted',
          count: item.Accepted,
        })),
        complaintData.map((item) => ({
          Type: item.Type,
          status: 'Rejected',
          count: item.Rejected,
        }))
      );

      const plot = new Column('chart-container', {
        data: transformedData,
        isGroup: true,
        xField: 'Type',
        yField: 'count',
        seriesField: 'status',
        interactions: [{ type: 'element-selected' }],
      });

      plot.render();

      return () => {
        plot.destroy();
      };
    }
  }, [complaintData]);

  return <div id="chart-container" />;
};

export default DashChart;
