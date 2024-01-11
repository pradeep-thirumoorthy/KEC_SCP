import React, { useState } from 'react';
import { Modal, Button, Input, Radio,Typography, Select } from 'antd';

const Reach = ({ slimit, setlimit, lastDate, getTodayDate, handleLastDateChange,setConstraint,setvisibility}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [radioValue, setRadioValue] = useState('private');
  const [department,setDepartment]=useState('Not Applied');
  const [Class,setClass]=useState('Not Applied');
  const [Batch,setBatch]=useState('Not Applied');

  const handleModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setvisibility(radioValue);
    setConstraint([department,Batch,Class]);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onChange = e => {
    setRadioValue(e.target.value);
  };

  const conditionalInputs = () => {
    if (radioValue === 'constraint') {
      return (
        <div>
          <Select className='w-100'
                value={department}
                onChange={(e) => {setDepartment(e);setBatch('Not Applied');setClass('Not Applied')}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="CSD">CSD</option>
                <option value="EEE">EEE</option>
                <option value="EIE">EIE</option>
            </Select>
            <Select className='w-100'
                value={Batch}
                disabled={(department==='Not Applied')}
                onChange={(e) => {setBatch(e);setClass('Not Applied')}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
            </Select>
            <Select className='w-100'
                value={Class}
                disabled={(Batch==='Not Applied')}
                onChange={(e) => {setClass(e)}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </Select>
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
          
          <Typography>Limit:</Typography>
          <Input
            type='number'
            value={slimit}
            onChange={(e) => setlimit(e.target.value)}
            required
            max='100'
            min='1'
          />
          <Typography style={{ whiteSpace: 'nowrap' }}>Last Date:</Typography>
          <Input
            type='date'
            value={lastDate}
            min={getTodayDate()}
            onChange={handleLastDateChange}
          />
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
            <Radio value="constraint">Conditional</Radio>
          </Radio.Group>
          {conditionalInputs()}
        </div>
      </Modal>
    </>
  );
};

export default Reach;
