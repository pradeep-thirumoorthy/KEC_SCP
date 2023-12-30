import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TimelineComponent from '../Timeline/TimelineComponent';
import { Divider, Steps, Typography } from 'antd';

const StudentActivityPanel = () => {
  const [current, setCurrent] = useState(0);
  
  const location = useLocation();
  const { info } = location.state || {};
  
  const { Heading } = location.state || {};
  const onchange = (value) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: 'Created',
      content: 'First-content',
      disabled: (info.info1==='')?true:false,
    },
    {
      title: 'Forwarded',
      content: 'Second-content',
      disabled: (info.info2==='')?true:false,
    },
    {
      title: 'Accepted',
      content: 'Last-content',
      disabled: (!(info.Status==='Accepted' ||info.Status ==='Resolved'))?true:false,
    },
    {
      title: 'Completed',
      content: 'Last-content',
      disabled: (info.info4==='' || info.Status==='Rejected')?true:false,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title:item.title,
    disabled:item.disabled,
  }));

  return (
    <>
      <Typography.Title level={1}>{Heading}</Typography.Title>
      <>
      {}
        <Steps current={current} className=' px-5' onChange={onchange} items={items} />
        <Divider />
      </>
      <TimelineComponent current={current} info={info}/>
    </>
  );
};

export default StudentActivityPanel;
