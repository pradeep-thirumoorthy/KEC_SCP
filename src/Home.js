import React from 'react';
import {Typography } from 'antd';
import Link from 'antd/es/typography/Link';
const Home= () => {
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