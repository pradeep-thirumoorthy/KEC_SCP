import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Modal, Radio, Result, Select, Typography } from "antd";

import {CheckOutlined,SendOutlined,CloseOutlined} from '@ant-design/icons';
import axios from "axios";
import { Descriptions } from "antd";
import CryptoJS from "crypto-js";
import { message,ConfigProvider } from 'antd';

const { Option } = Select;

const Forward2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Upstream,setUpstream]=useState([]);
  const [Downstream,setDownstream]= useState([]);
  const [upordown,setupordown]=useState('UpStream');
  const { info} = location.state || {};
  const [Faculty, setFaculty] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const key = 'updatable';

  const handleFacultyChange = (value) => {
    setFaculty(value);
  };
  useEffect(() => {
    if (info && info.Batch) {
    const apiUrl = `http://localhost:8000/Admin/Complaints/Designation.php?department=${info.Department}&class=${info.Class}&batch=${info.Batch}&level=${info.Level}`;

    axios
  .get(apiUrl)
  .then((response) => {
    const responseData = response.data;
    console.log(responseData); // Check the structure of the response

    if (responseData.success) {
      const subjectsData = responseData.data; // Accessing the entire 'data' object
      const upstreamData = subjectsData.Upstream; // Accessing 'Upstream' array
      const downstreamData = subjectsData.Downstream; // Accessing 'Downstream' array

      console.log(upstreamData); // Array containing Upstream data
      console.log(downstreamData);
      if (Array.isArray(upstreamData) && upstreamData.length > 0) {
        const processedData = [];
      
        upstreamData.forEach((subjectObj) => {
          Object.keys(subjectObj).forEach((subjectKey) => {
            const email = subjectObj[subjectKey];
            console.log(`Subject: ${subjectKey}, Email: ${email}`);
      
            // Push transformed objects into a new array
            processedData.push({ name: subjectKey, email: email });
          });
        });
      
        console.log(processedData);
        setUpstream(processedData);
      }
      const subjects = [];

if(info.Level===1){
for (let i = 1; i <= 6; i++) {
  const subjectKey = `Subject_${i}`;
  console.log(subjectKey, downstreamData);

  const subjectData = downstreamData[0][subjectKey];
  console.log(subjectData); // Access data based on Subject_i key
  if (subjectData) {
    const data = JSON.parse(subjectData);
    console.log('Subject:', data);
    const subjectName = Object.keys(data)[0];
    const subjectEmail = data[subjectName];
    subjects.push({ name: subjectName, email: subjectEmail });
  } else {
    console.log(`No data found for ${subjectKey}`);
  }
}}
else if(info.Level===2){
  for (let i = 1; i <= 3; i++) {
  const subjectKey = `Advisor${i}`;
  console.log(subjectKey, downstreamData);
  const subjectName = subjectKey;
  const subjectEmail = downstreamData[0][subjectKey];
  subjects.push({ name: subjectName, email: subjectEmail });
}}
else if(info.Level===3){
  const subjectKey = `Year_Incharge`;
  const subjectName = subjectKey;
  const subjectEmail = downstreamData[0][subjectKey];
  subjects.push({ name: subjectName, email: subjectEmail });
}


console.log(subjects);
setDownstream(subjects);
    } else {
      alert("Invalid response from the server.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
}
}, [Faculty]);


  const togglePopup = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    const confirmed = window.confirm("Are you sure you want to Forward the complaint?");
    
    if (confirmed) {
      message.loading({ content: 'Forwarding...', key,duration:20 });
      
      axios
        .post("http://localhost:8000/Admin/ForwardComplaint.php", {
          info: info,
          Faculty: Faculty,
          mode: "Forward",
          upordown:upordown
        })
        .then((response) => {
          if(response.data.success){
          message.success({ content: 'Forwarded complaint successfully!', key, duration: 2 });
          setTimeout(() => {
            navigate("/admin/Complaints");
          }, 2000);
        }
        else{
          message.warning({ content: response.data.message, key, duration: 2 });
          console.log(response.data);
        }
        })
        .catch((error) => {
          console.error("Error forwarding complaint:", error);
        })
        .finally(() => {
          setIsModalVisible(false);
        });
    }
  };
  const handleAccept = () => {
    const confirmed = window.confirm('Are you sure you want to accept the complaint?');
    if (confirmed) {
      
    message.loading({ content: 'Processing...', key,duration:20 });
        axios
            .post("http://localhost:8000/Admin/ForwardComplaint.php", { info: info,Faculty: email, mode: 'Accept' })
            .then((response) => {
                console.log("Accepted complaint successfully!", response.data);
                togglePopup();
                setTimeout(() => {
                  navigate('/admin/Activity');
                }, 2000);
            })
            .catch((error) => {
                console.error("Error forwarding complaint:", error);
                // Handle errors here
            })
            .finally(() => {
              message.success({ content: 'Complaint Accepted', key, duration: 2 });
              setIsModalVisible(false);
            });
    }
  };
  const handleReject = () => {
    const confirmed = window.confirm('Are you sure you want to Reject the complaint?');
    if (confirmed) {
      
    message.loading({ content: 'Processing...', key,duration:20 });
    axios
      .post("http://localhost:8000/Admin/ForwardComplaint.php", {info: info,Faculty: email,mode:'Reject'})
      .then((response) => {
        console.log("Rejected complaint successfully!", response.data);
        togglePopup();
        setTimeout(() => {
          navigate("/admin/Complaints");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error forwarding complaint:", error);
        // Handle errors here
      }).finally(() => {
        message.info({ content: 'Complaint Rejected', key, duration: 2 });
        setIsModalVisible(false);
      });
    }
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Update options when upordown changes
    const newOptions = [];

    if (upordown === "UpStream") {
      newOptions.length=0;
      if (Upstream.length > 0) {
        Upstream.forEach((item) => {
          newOptions.push(
            <Option key={item.email} value={item.email}>
              {item.name}
            </Option>
          );
        });
      } else {
        newOptions.push(<Option value="" disabled>No Names Available</Option>);
      }
    } else {
      if (Downstream.length > 0) {
        newOptions.length=0;
        Downstream.forEach((item) => {
          newOptions.push(
            <Option key={item.email} value={item.email}>
              {item.name}
            </Option>
          );
        });
      } else {
        newOptions.push(<Option value="" disabled>No Names Available</Option>);
      }
    }
    setOptions(newOptions);
  }, [upordown, Upstream, Downstream]);
  
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [Extra,setExtra]=useState({});
  useEffect(() => {
    if(info){
    if (info.Type === "Maintenance") {
      const parsedExtra = JSON.parse(info.Extra);
      setExtra(parsedExtra);
    }
  }
  }, [info]);
  const Email = sessionStorage.getItem('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, "admin-_?info");
  const email = bytes.toString(CryptoJS.enc.Utf8);

  return (
    <div className="vh-100">
      {info?<ConfigProvider
  >
<Descriptions title="Complaint Data"   column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }} bordered labelStyle={{fontStyle:'oblique'}} >
            {(info.Type !== "Courses")?<><Descriptions.Item label="Name">{info.Name}</Descriptions.Item>
            <Descriptions.Item label="RollNo">{info.Roll_No}</Descriptions.Item>
            <Descriptions.Item label="Email">{info.email}</Descriptions.Item></>:<></>}
            
            <Descriptions.Item label="Type">{info.Type}</Descriptions.Item>
            <Descriptions.Item label="Status">{info.Status}</Descriptions.Item>
            
            {(info.Type === "Courses")?<>
            
            <Descriptions.Item label="Courses">{info.Extra}</Descriptions.Item>
            </>:<></>}

            <Descriptions.Item label="Class">{info.Class}</Descriptions.Item>
            <Descriptions.Item label="Batch">{info.Batch}</Descriptions.Item>
            <Descriptions.Item label="Date">{info.info1}</Descriptions.Item>
            {(info.Type === "Maintenance")?<>
            <Descriptions.Item label="Category">{Extra.category}</Descriptions.Item>
            <Descriptions.Item label="Floor">{Extra.Floor}</Descriptions.Item>
            <Descriptions.Item label={(Extra.category==='Other Area')?"Item":(Extra.category==='Restroom')?"Gender":(Extra.category ==='Classroom')?"Classroom":""}>{Extra.data}</Descriptions.Item>
</>:<></>}
            <Descriptions.Item label="Description">{info.Description}</Descriptions.Item>
            
          </Descriptions>

      <div className="d-flex justify-content-center my-5" id="access">
        <div className="row h-auto">
          <div className="col-4">
            <Button style={{backgroundColor:'green'}} type="primary"  size="large" onClick={handleAccept}>
              <CheckOutlined />
              Accept
            </Button>
          </div>
          <div className="col-4">
          {(info.Type === "Maintenance")?<></>:<>
            <Button size="large" type="primary"  onClick={togglePopup}>
              <SendOutlined />
              Forward
            </Button>
            <Modal
  title="Forward Complaint"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <div>
    <Radio.Group onChange={(e)=>{setupordown(e.target.value);setFaculty('')}} defaultValue="a" style={{ marginTop: 16 }}>
      <Radio.Button defaultChecked value="UpStream">UpStream</Radio.Button>
      <Radio.Button value="DownStream">DownStream</Radio.Button>
    </Radio.Group>
    
    <Typography.Title level={3}>{upordown}</Typography.Title>
    
    <Select style={{ width: "100%" }} value={Faculty} onChange={handleFacultyChange}>
    {options}
</Select>

    <div className="fs-3">Forward To:</div>
    <Input type="text" value={Faculty} disabled/>
    
  </div>
</Modal>

            </>}
          </div>
          <div className="col-4">
            <Button danger size="large" type="primary" onClick={handleReject}>
              <CloseOutlined />
              Reject
            </Button>
          </div>
        </div>
      </div>
      </ConfigProvider>:
      <>
      <Result
    status="error"
    title="No Complaint Choosen"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button type="primary" onClick={()=>{navigate('/admin/Complaints')}}>
        Go Console
      </Button>
    ]}
  >
  </Result></>}
    </div>
  );
};

export default Forward2;
