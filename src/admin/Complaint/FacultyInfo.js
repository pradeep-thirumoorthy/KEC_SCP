import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, Result, Select } from "antd";
import { FiCheck } from "react-icons/fi";
import { TbArrowForwardUp } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Descriptions } from "antd";
import CryptoJS from "crypto-js";
import { message,ConfigProvider } from 'antd';

const { Option } = Select;

const FacultyInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fetchedNames, setFetchedNames] = useState([]);
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
    if (!Designation) {
      setFetchedNames([]);
      return;
    }

    const apiUrl = `http://localhost:8000/getdesignation.php?designation=${Designation}`;

    axios
      .get(apiUrl, { designation: Designation })
      .then((response) => {
        const names = response.data.data;
        if (Array.isArray(names)) {
          setFetchedNames(names);
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
        .post("http://localhost:8000/ForwardComplaint.php", {
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
            .post("http://localhost:8000/Facultyforward.php", { info: info,Faculty: email, mode: 'Accept' })
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
      .post("http://localhost:8000/Facultyforward.php", {info: info,Faculty: email,mode:'Reject'})
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
            <span className="fs-2 fw-bolder fst-italic">Complaint Info</span>
            <br />
            <span className=" fst-italic no-wrap">Here is the Info of the complaint arrived</span>
          </div>
        </div>
      </div>
      {info?<ConfigProvider
  theme={{
    token: {
      colorFillAlter:'#d8d8d8',
      colorSplit:'#999999'
    },
  }}
>
<Descriptions title="Complaint Data"  bordered column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}} labelStyle={{color:'black',fontStyle:'oblique'}} >
            
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
              <FiCheck />
              Accept
            </Button>
          </div>
          <div className="col-6">
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
