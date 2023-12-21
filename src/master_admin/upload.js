// CSVReaderComponent.js
import { Table } from 'antd';
import React, { useState } from 'react';

const CSVReaderComponent = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map(row => row.split(','));

      // Extract headers from the first row
      const headers = rows[0];

      // Set columns for Ant Design Table
      const formattedColumns = headers.map(header => ({
        title: header,
        dataIndex: header,
        key: header,
      }));
      setColumns(formattedColumns);

      // Remove the first row (headers) and create objects
      const formattedData = rows.slice(1).map(row => {
        return headers.reduce((acc, current, index) => {
          acc[current] = row[index];
          return acc;
        }, {});
      });

      setData(formattedData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default CSVReaderComponent;
