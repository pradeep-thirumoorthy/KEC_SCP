import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Typography } from 'antd';

const StudentDash = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Typography.Title level={3} style={{fontFamily:"monospace"}}>Loading...</Typography.Title>
      ) : (
        <>
          <Typography.Title level={1}>Student Dashboard</Typography.Title>
        </>
        )}
    </>
  );
};

export default StudentDash;
