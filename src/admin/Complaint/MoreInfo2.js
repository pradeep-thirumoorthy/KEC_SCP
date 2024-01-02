import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Modal, Result, Select, Typography } from "antd";
import { FiCheck } from "react-icons/fi";
import { TbArrowForwardUp } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
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
  const [fetchedNames, setFetchedNames] = useState({});
  const [Designation, setDesignation] = useState("");
  const { info } = location.state || {};
  const [Faculty, setFaculty] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const key = 'updatable';
  const handleDesignationChange = (value) => {
    setDesignation(value);
  };

  const handleFacultyChange = (value) => {
    setFaculty(value);
  };
  useEffect(() => {
    fetchData();
  }, [Designation, Faculty]);

  const fetchData = () => {
    const apiUrl = `http://192.168.77.250:8000/getdesignation - Copy.php?department=${info.Department}&class=${info.Class}&batch=${info.Batch}&level=${info.Level}`;


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

for (let i = 1; i <= 6; i++) {
  const subjectKey = `Subject_${i}`;
  console.log(subjectKey, downstreamData);

  const subjectData = downstreamData[0][subjectKey];
  console.log(subjectData); // Access data based on Subject_i key
  if (subjectData) {
    const data = JSON.parse(subjectData);
    console.log('Subject:', data);
    const subjectName = Object.keys(data)[0]; // Extract subject name
    const subjectEmail = data[subjectName]; // Extract subject email
    subjects.push({ name: subjectName, email: subjectEmail });
  } else {
    console.log(`No data found for ${subjectKey}`);
  }
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
  };


  const togglePopup = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOk = () => {
    const confirmed = window.confirm("Are you sure you want to Forward the complaint?");
    
    if (confirmed) {
      message.loading({ content: 'Forwarding...', key,duration:20 });
      
      axios
        .post("http://192.168.77.250:8000/ForwardComplaint.php", {
          info: info,
          Faculty: Faculty,
          mode: "Forward",
        })
        .then((response) => {
          // Delayed navigation after 2 seconds
          setTimeout(() => {
            navigate("/admin/Complaints");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error forwarding complaint:", error);
        })
        .finally(() => {
          message.success({ content: 'Forwarded complaint successfully!', key, duration: 2 });
          setIsModalVisible(false);
        });
    }
  };
  const handleAccept = () => {
    const confirmed = window.confirm('Are you sure you want to accept the complaint?');
    if (confirmed) {
      
    message.loading({ content: 'Processing...', key,duration:20 });
        axios
            .post("http://192.168.77.250:8000/ForwardComplaint.php", { info: info,Faculty: email, mode: 'Accept' })
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
      .post("http://192.168.77.250:8000/ForwardComplaint.php", {info: info,Faculty: email,mode:'Reject'})
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
      <div className="row">
        <div className="row border-bottom pb-3">
          <div className="col-lg-12">
            <Typography className="fs-2 fw-bolder fst-italic">Complaint Info</Typography>
            <br />
            <Typography className=" fst-italic no-wrap">Here is the Info of the complaint arrived</Typography>
          </div>
        </div>
      </div>
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
              <FiCheck />
              Accept
            </Button>
          </div>
          <div className="col-4">
          {(info.Type === "Maintenance")?<></>:<>
            <Button size="large" type="primary"  onClick={togglePopup}>
              <TbArrowForwardUp />
              Forward
            </Button>
            <Modal
  title="Forward Complaint"
  visible={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <div>
    
    <div className="fs-3">UpStream:</div>
    <Select style={{ width: "100%" }} value={Faculty} onChange={handleFacultyChange}>
      <Option value="">NiL</Option>
      {Upstream.length > 0 ? (
        Upstream.map((item) => (
          <Option key={item.email} value={item.email}>
            {item.name}
          </Option>
        ))
      ) : (
        <Option value="" disabled>
          No Names Available
        </Option>
      )}
    </Select>
    <div className="fs-3">Forward To:</div>
    <Input type="text" value={Faculty} disabled/>
    <div className="fs-3">Downstream:</div>
    <Select style={{ width: "100%" }} value={Faculty} onChange={handleFacultyChange}>
      <Option value="">NiL</Option>
      {Downstream.length > 0 ? (
        Downstream.map((item) => (
          <Option key={item.email} value={item.email}>
            {item.name}
          </Option>
        ))
      ) : (
        <Option value="" disabled>
          No Names Available
        </Option>
      )}
    </Select>
  </div>
</Modal>

            </>}
          </div>
          <div className="col-4">
            <Button danger size="large" type="primary" onClick={handleReject}>
              <RxCross2 />
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