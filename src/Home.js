import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
const Home= () => {
  const navigate = useNavigate();
      return (
        <>
        <div>
            <Typography.Title level={1}>Home Page</Typography.Title>
            <Link href='/admin/login' >Admin Login</Link>
        </div>
        </>
      );
   }
export default Home;