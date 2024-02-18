import './App.css';
import { Button, Card, Row, Col, ConfigProvider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Pro from './images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className='myvideo'>
        <div className="w-100">
          <ConfigProvider theme={{
          components: {
            Button: {
              colorPrimary: '#00b96b',
              algorithm:true,
            },
          },
        }}>
          <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col span={24} className="text-center">
              <h3 className="animate-charcter">Student Complaint Portal</h3>
            </Col>
            <Row gutter={[16, 16]} align="middle" justify="space-between">
              <Col lg={12} sm={16}>
                <Card hoverable style={{ textAlign: 'center', width: '400px' }} bordered>
                  <Typography.Title level={1}>Admin Login</Typography.Title>
                  <img src={Pro} style={{ height: "150px", borderRadius: "50%" }} alt='prof' className='py-3' /><br></br>
                  <Button type='primary' onClick={() => { navigate("/admin/login") }} >Enter</Button>
                </Card>
              </Col>
              <Col lg={12} sm={16}>
                <Card hoverable style={{ textAlign: 'center', width: '400px' }}>
                <Typography.Title level={1}>Student Login</Typography.Title>
                  <img src={Pro} style={{ height: "150px", borderRadius: "50%" }} alt='prof' className='py-3'></img><br></br>
                  <Button type='primary' onClick={() => { navigate("/student/login") }} >Enter</Button>
                </Card>
              </Col>
            </Row>
          </Row>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

export default App;
