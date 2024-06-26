import { LoadingOutlined } from '@ant-design/icons';
import { Button, Result, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
const FNF = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const back=()=>{
    navigate(-1);
  }
  return (
    <section className="fnf-container">
      {isLoading ? (
        <div className="loading">
          <Typography.Title level={3}><Spin spinning={true} fullscreen /></Typography.Title>
        </div>
      ) : (
        <div className="error-content">
          <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={back}>Back Home</Button>}
  />
        </div>
      )}
    </section>
  );
};

export default FNF;
