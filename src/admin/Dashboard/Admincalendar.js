import React, { useEffect, useState } from 'react';
import { Badge, Calendar, Modal, Button, List, Pagination } from 'antd';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
const Admincalendar = () => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    
  const [currentPage, setCurrentPage] = useState(1);
    const [events, setEvents] = useState({});
  const [pageSize, setPageSize] = useState(5);
    const navigate= useNavigate();

    const handleDateClick = (value) => {
      setSelectedDate(value);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
    const dateCellRender = (value) => {
      const dateKey = value.format('YYYY-MM-DD');
      const dateEvents = events[dateKey] || [];
      return (
        <div onClick={() => handleDateClick(value)} className="date-cell" style={{ height: '70px' }}>
          {dateEvents.map((item, index) => (
            <Badge key={index} status={item.type} text={item.content} />
          ))}
        </div>
      );
    };
    
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
      };
    
      const getPaginatedEvents = () => {
        const selectedDateKey = selectedDate ? selectedDate.format('YYYY-MM-DD') : null;
    
        // If a date is selected, filter events for that date
        if (selectedDateKey) {
          const dateEvents = events[selectedDateKey] || [];
          return dateEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        }
    
        // If no date is selected, show events for all dates
        const allEvents = Object.values(events).flat();
        return allEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      };
      
    const filterData = async () => {
        try {
          const Email = sessionStorage.getItem('AdminEmail');
          const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
          const email = bytes.toString(CryptoJS.enc.Utf8);
          const apiUrl = 'http://192.168.77.250:8000/AdminCalendar.php';
          const params = {
            email: email,
          };
      
          const response = await axios.get(apiUrl, { params });
      
          if (response.status === 200) {
            const complaints = response.data.data || [];
      
            const newEvents = {};
            complaints.forEach((complaint) => {
              const { info1, Type, Description, Status } = complaint;
              const dateKey = info1;
              let color = 'Error';
          
              if (Status === 'Resolved') {
                color = 'success';
              } else if (Status === 'Arrived') {
                color = 'warning';
              }
              else if (Status === 'Accepted') {
                color = 'processing';
              }
              else if (Status === 'Rejected') {
                color = 'error';
              }
              const newItem = {
                
                type: color, // Adjusted for consistency
                content: `${Type}`,
                Description: `${Description}`,
                info:complaint,
              };
      
              // Use the date as a key
              if (!newEvents[dateKey]) {
                newEvents[dateKey] = [];
              }
      
              newEvents[dateKey].push(newItem);
            });
            setEvents((prevEvents) => ({
              ...prevEvents,
              ...newEvents,
            }));
          } else {
            console.error('Error: Unexpected response status:', response.status);
          }
        } catch (error) {
          console.error('Error filtering data:', error);
        }
      };
      
            
  
    useEffect(() => {
      filterData();
    }, []); // Fetch data when the component mounts
    const handleButtonClick=(rowData)=>
  {
    if(rowData.Status==='Arrived'){
      navigate('/admin/Complaints/MoreInfo', { state: { info: rowData } });
    }
    if(rowData.Status==='Accepted'){
      navigate('/admin/Activity/Panel', { state: { info: rowData } });
    }
  };
  return (
    <>
        <Calendar cellRender={dateCellRender} />
      <Modal
        title={`Events for ${selectedDate ? selectedDate.format('YYYY-MM-DD') : ''}`}
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {selectedDate && (
          <div>
            <p>Date: {selectedDate.format('YYYY-MM-DD')}</p>
            <List className="events">
              {getPaginatedEvents().map((item, index) => (
                <List.Item key={index}>
                  <Badge status={item.type} text={item.content + ' : ' + item.Description} />
                  <Button
                    type="primary"
                    onClick={() => {
                      handleButtonClick(item.info);
                      console.log(item.info);
                    }}
                  >
                    View
                  </Button>
                </List.Item>
              ))}
            </List>
            <div style={{ textAlign: 'center' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={Object.values(events).flat().length}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Admincalendar;