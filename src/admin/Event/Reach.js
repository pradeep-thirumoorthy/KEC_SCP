import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Radio } from 'antd'; // Import Radio from 'antd'
import CryptoJS from 'crypto-js';
import axios from 'axios';

const MAX_TIMEOUT = 10000;

const Reach = ({ slimit, setlimit, lastDate, getTodayDate, handleLastDateChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [radioValue, setRadioValue] = useState('public'); // State for radio button value
  const [department, setDepartment] = useState(''); // State for department input
  const [batch, setBatch] = useState(''); // State for batch input
  const [classValue, setClassValue] = useState(''); // State for class input

  const Email = sessionStorage.getItem('AdminEmail');

  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle any action upon clicking OK in the modal
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onChange = e => {
    setRadioValue(e.target.value);
  };

  const conditionalInputs = () => {
    if (radioValue === 'conditional') {
      return (
        <div>
          <Input
            value={department}
            onChange={e => setDepartment(e.target.value)}
            placeholder="Department"
          />
          <Input
            value={batch}
            onChange={e => setBatch(e.target.value)}
            placeholder="Batch"
          />
          <Input
            value={classValue}
            onChange={e => setClassValue(e.target.value)}
            placeholder="Class"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Button style={{ float: 'inline-end' }} className='mx-3 my-2' onClick={handleModal}>
        Constraints
      </Button>
      <Modal
        title="Modal Title"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div>
          
          <span>Limit:</span>
          <Input
            type='number'
            value={slimit}
            onChange={(e) => setlimit(e.target.value)}
            required
            max='100'
            min='1'
          />
          <span style={{ whiteSpace: 'nowrap' }}>Last Date:</span>
          <Input
            type='date'
            value={lastDate}
            min={getTodayDate()}
            onChange={handleLastDateChange}
          />
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
            <Radio value="conditional">Conditional</Radio>
          </Radio.Group>
          {conditionalInputs()}
        </div>
      </Modal>
    </>
  );
};

export default Reach;
