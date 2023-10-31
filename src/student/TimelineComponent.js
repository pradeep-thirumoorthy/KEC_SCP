import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined ,SendOutlined,CarryOutOutlined,TagOutlined,CloseCircleOutlined, LoadingOutlined} from '@ant-design/icons';

const TimelineComponent = ({ current,info }) => {
  const [timelineData, setTimeData] = useState([]);
  const [Pending,setPending] = useState(false);
  useEffect(() => {
    if (current === 0) {
        setTimeData([
          {
            label: <div className='mx-5'>{info.info1} {info.CreateTime}</div>,
            children: <div className='mx-5'>Created a Complaint :<br/>
            Name: {info.Name}<br/>
            Type: {info.Type}<br/>
            Description: {info.Description}
            <br /><br /><br /><br /></div>,
            dot: <TagOutlined  style={{ fontSize: '30px',color:'gold' }} />,
          }]);
        setPending(false);
      }
      if (current === 1) {
        const rawData = JSON.parse(info.info2)
  
        const dataToDisplay = rawData.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          
          if (key === "Forwarded") {
            setPending(true);
            return {
              label: <div className='mx-5'>{value[1]}</div>,
              children: <div className='mx-5'>Forwarded to {value[0]}<br /><br /><br /><br /></div>,
              dot: <SendOutlined style={{ fontSize: '30px' }} />,
            };
          } else if (key === "Accepted") {
            setPending(false);
            return {
              label: <div className='mx-5'>{value[1]}</div>,
              children: <div className='mx-5'>Accepted by {value[0]}<br /><br /><br /><br /></div>,
              dot: <CheckCircleOutlined  style={{ fontSize: '30px',color:'green' }} />,
            };
          }else if (key === "Rejected") {
            setPending(false);
            return {
              label: <div className='mx-5'>{value[1]}</div>,
              children: <div className='mx-5'>Accepted by {value[0]}<br /><br /><br /><br /></div>,
              dot: <CloseCircleOutlined style={{ fontSize: '30px', color:'red' }} />,
            };
          }
  
          return null; // Return null for any other cases
        }).filter(Boolean);
  
        setTimeData(dataToDisplay);
      }
      if (current === 2) {
        const rawData = JSON.parse(info.info3);
        if(info.info4===''){
            setPending(true);
        }
        else{
            setPending(false);
        }
        const dataToDisplay = rawData.map((item, index) => {
          const timestamp = Object.keys(item)[0];
          const message = item[timestamp];
          
          return {
            label: <div className='mx-5'>{timestamp}</div>,
            children: <div className='mx-5'>{message}<br /><br /><br /><br /></div>,
            dot: <ClockCircleOutlined style={{ fontSize: '30px' }} />,
          };
        });
  
        setTimeData(dataToDisplay);
      }
      if (current === 3) {
        setTimeData([
          {
            label: <div className='mx-5'>{info.info4}</div>,
            children: <div className='mx-5'>The complaint is resolved<br /><br /><br /><br /></div>,
            dot: <CarryOutOutlined style={{ fontSize: '30px',color:'green' }} />,
          }]);
        setPending(false);
      }
  }, [current]);

  return (
    <>
    <div>
      <Timeline style={{}} pending={Pending} pendingDot={<LoadingOutlined style={{fontSize: '20px'}}/>} mode={'left'}>
        {timelineData.map((item, index) => (
          <Timeline.Item key={index} label={item.label} dot={item.dot}>
            {item.children}
          </Timeline.Item>
        ))}
      </Timeline>
      </div>
    </>
  );
};

export default TimelineComponent;
