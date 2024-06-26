import React, { useState, useEffect } from 'react';
import { Descriptions, Result, Timeline } from 'antd';
import {ClockCircleOutlined, LoadingOutlined} from '@ant-design/icons';
import './styles.css';
const TimelineComponent2 = ({ current,info }) => {
  const [timelineData, setTimeData] = useState([]);
  const [Pending,setPending] = useState(false);
  const [Extra,setExtra]=useState({});
  useEffect(() => {
    //console.log(info)
    //console.log(timelineData)
  if(info){
    if (info.Type === "Maintenance") {
      const parsedExtra = JSON.parse(info.Extra);
      setExtra(parsedExtra);
    }
  }
      if (current === 1) {
        const rawData = JSON.parse(info.info3);
        if(info.info4==='[{}]'){
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
  }, [current, info]);

  return (
    <>
    <div>
    {current === 0 ? (
  // Render content for current === 0
  <Descriptions
    title="Complaint Data" bordered
    
    column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
    labelStyle={{ fontStyle: 'oblique' }}
  >
    {info.Type !== 'Anonymous' ? (
      <>
        <Descriptions.Item label="Name">{info.Name}</Descriptions.Item>
        <Descriptions.Item label="RollNo">{info.Roll_No}</Descriptions.Item>
        <Descriptions.Item label="Email">{info.email}</Descriptions.Item>
      </>
    ) : null}

    <Descriptions.Item label="Type">{info.Type}</Descriptions.Item>
    <Descriptions.Item label="Status">{info.Status}</Descriptions.Item>

    {info.Type === 'Courses' ? (
      <Descriptions.Item label="Courses">{info.Extra}</Descriptions.Item>
    ) : null}

    <Descriptions.Item label="Class">{info.Class}</Descriptions.Item>
    <Descriptions.Item label="Batch">{info.Batch}</Descriptions.Item>
    <Descriptions.Item label="Date">{info.info1}</Descriptions.Item>

    {info.Type === 'Maintenance' ? (
      <>
        <Descriptions.Item label="Category">{Extra.category}</Descriptions.Item>
        <Descriptions.Item label="Floor">{Extra.Floor}</Descriptions.Item>
        <Descriptions.Item
          label={
            Extra.category === 'Other Area'
              ? 'Item'
              : Extra.category === 'Restroom'
              ? 'Gender'
              : Extra.category === 'Classroom'
              ? 'Classroom'
              : ''
          }
        >
          {Extra.data}
        </Descriptions.Item>
      </>
    ) : null}

    <Descriptions.Item label="Description">{info.Description}</Descriptions.Item>
  </Descriptions>
) : current === 2 ? (
  <Result
  status={(info.Status==='Resolved')?"success":"error"}
  title={`${info.Status} by ${JSON.parse(info.info4)[0]}`}
  subTitle={`At ${JSON.parse(info.info4)[1]}`}
/>

) : (
  // Render content for other cases (current !== 0 and current !== 4)
  <>
    {!(info.Status === 'Accepted' && current === 2 && timelineData === '') && (
      <Timeline
        style={{}}
        pending={Pending}
        pendingDot={<LoadingOutlined style={{ fontSize: '20px' }} />}
        mode={'left'}
      >
        {timelineData.map((item, index) => (
          <Timeline.Item key={index} label={item.label} dot={item.dot}>
          {item.children}
        </Timeline.Item>
        
        ))}
      </Timeline>
    )}
  </>
)}

      
      </div>
    </>
  );
};

export default TimelineComponent2;
