import React, { useEffect, useState } from "react";
import { FiArrowUp, FiCheck } from "react-icons/fi";
import { useLocation,useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import axios from "axios";
import { Button, ConfigProvider, Descriptions, Result, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
const ActivityPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { info } = location.state || {};
  const [Update,setUpdate]=useState('');
  const handleValue=(e)=>{
    setUpdate(e.target.value)
  }
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

  const handleUpdate=()=>{
    console.log(Update)
    const confirmed = window.confirm('Are you sure you want to Update for this complaint?');
    if (confirmed) {
    axios
      .post("http://192.168.77.250:8000/ForwardComplaint.php", {info: info,Faculty: email, mode: 'Update',Message:Update})
      .then((response) => {
        console.log("Complaint Updation successfully!", response.data);
        navigate('/admin/Activity');
      })
      .catch((error) => {
        console.error("Error forwarding complaint:", error);
        // Handle errors here
      });
    }
  }
  const Resolved =()=>{
    const confirmed = window.confirm('Are you sure you want to Complete the resolvation of the complaint?');
    if (confirmed) {
    axios
      .post("http://192.168.77.250:8000/ForwardComplaint.php", {info:info,Faculty:email,mode:'Resolve'})
      .then((response) => {
        console.log("Complaint Updation successfully!", response.data);
        navigate('/admin/Activity');
      })
      .catch((error) => {
        console.error("Error forwarding complaint:", error);
        // Handle errors here
      });
    }
  }
  
  return (
    
        <>
        <div className=" row ">
                <div className="row border-bottom pb-3">
                  <div className="col-lg-12">
                    <Typography className="fs-2 fw-bolder fst-italic">Activity Panel</Typography><br />
                    <Typography className=" fst-italic no-warp">Here is the Info of the complaint arrived</Typography>
                  </div>
                </div>
              </div>
              {info?<ConfigProvider
  >
<Descriptions title="Complaint Data"  bordered column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }} labelStyle={{fontStyle:'oblique'}} >
            <Descriptions.Item label="Name">{info.Name}</Descriptions.Item>
            <Descriptions.Item label="Complaint_Id">{info.Complaint_Id}</Descriptions.Item>
            <Descriptions.Item label="RollNo">{info.Roll_No}</Descriptions.Item>
            <Descriptions.Item label="Email">{info.email}</Descriptions.Item>
            <Descriptions.Item label="Type">{info.Type}</Descriptions.Item>
            <Descriptions.Item label="Status">{info.Status}</Descriptions.Item>
            {(info.Type === "Maintenance")?<>
            <Descriptions.Item label="Category">{Extra.category}</Descriptions.Item>
            <Descriptions.Item label="Floor">{Extra.Floor}</Descriptions.Item>
            <Descriptions.Item label={(Extra.category==='Other Area')?"Item":(Extra.category==='Restroom')?"Gender":(Extra.category ==='Classroom')?"Classroom":""}>{Extra.data}</Descriptions.Item>
</>:<></>}
            <Descriptions.Item label="Description">{info.Description}</Descriptions.Item>
            
          </Descriptions>
      <div className="d-flex justify-content-center align-items-center">
            <Typography.Title level={5}><div>Update:</div><div>
              <TextArea value={Update}onChange={handleValue} rows={2} cols={40} maxLength={50}/></div></Typography.Title></div>
      <div className="d-flex justify-content-center my-5" id="access">
      <div className="row h-auto">
            <div className="col-6">
              <Button  type="primary"  size="large" onClick={handleUpdate}><FiArrowUp/>Update</Button>
            </div>
            <div className="col-6">
              <Button style={{backgroundColor:'green'}} type="primary" size="large" onClick={Resolved}><FiCheck/>Resolved</Button>
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
      <Button type="primary" onClick={()=>{navigate('/admin/Activity')}}>
        Go Console
      </Button>
    ]}
  >
  </Result></>}
        
      
        
      </>
  );
}

export default ActivityPanel;