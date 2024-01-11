import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import {CloseOutlined,CheckOutlined} from '@ant-design/icons';
import axios from "axios";
import { Descriptions } from "antd";
import { message} from 'antd';
import { getEmailFromSession } from "../EmailRetrieval";

const FacultyInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { info } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const key = 'updatable';


  const togglePopup = () => {
    setIsModalVisible(!isModalVisible);
  };
  const email=getEmailFromSession();
  const handleAccept = () => {
    const confirmed = window.confirm('Are you sure you want to accept the complaint?');
    if (confirmed) {
      
    message.loading({ content: 'Processing...', key,duration:20 });
        axios
            .post("http://localhost:8000/ForwardComplaint2.php", { Complaint_Id: info.Complaint_Id,Faculty: email, mode: 'Accept' })
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
      .post("http://localhost:8000/ForwardComplaint2.php", {Complaint_Id: info.Complaint_Id,Faculty: email,mode:'Reject'})
      .then((response) => {
        console.log("Rejected complaint successfully!", response.data);
        togglePopup();
        setTimeout(() => {
          navigate("/admin/Faculty");
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

  return (
    <div className="vh-100">
      {info?
      <>
<Descriptions bordered title="Complaint Data"   column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}} labelStyle={{fontStyle:'oblique'}} >
              
            <Descriptions.Item label="Name">{info.Name}</Descriptions.Item>
            <Descriptions.Item label="Roll No">{info.Roll_No}</Descriptions.Item>
            <Descriptions.Item label="Courses">{info.Subjectname}</Descriptions.Item>
            <Descriptions.Item label="Faculty">{info.FacultyName}</Descriptions.Item>
            <Descriptions.Item label="Status">{info.Status}</Descriptions.Item>
            <Descriptions.Item label="Class">{info.Class}</Descriptions.Item>
            <Descriptions.Item label="Batch">{info.Batch}</Descriptions.Item>
            <Descriptions.Item label="Date">{info.info1}</Descriptions.Item>
            <Descriptions.Item label="Description">{info.Description}</Descriptions.Item>
            
          </Descriptions>

      <div className="d-flex justify-content-center my-5" id="access">
        <div className="row h-auto">
          <div className="col-6">
            <Button type="primary"  size="large" onClick={handleAccept}>
              <CheckOutlined />
              Accept
            </Button>
          </div>
          <div className="col-6">
            <Button danger size="large" type="primary" onClick={handleReject}>
              < CloseOutlined/>
              Reject
            </Button>
          </div>
        </div>
      </div></>:
      <>
      <Result
    status="error"
    title="No Complaint Choosen"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button type="primary" onClick={()=>{navigate('/admin/Faculty')}}>
        Go Console
      </Button>
    ]}
  >
  </Result></>}
    </div>
  );
};

export default FacultyInfo;
