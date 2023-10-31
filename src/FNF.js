import { LoadingOutlined } from '@ant-design/icons';
import { Button, Result, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
const FNF = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Display content after 1 second

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
          <h3><Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /></h3>
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
