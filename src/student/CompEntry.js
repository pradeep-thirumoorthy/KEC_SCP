import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';

const ComplaintEntry = () => {
  
  const [isFormModified, setIsFormModified] = useState(false);

  // Function to update isFormModified when the form is modified
  const handleFormChange = () => {
    setIsFormModified(true);
  };

  // Attach the beforeunload event listener when isFormModified is true
  useEffect(() => {
    if (isFormModified) {
      const confirmLeave = (e) => {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      };

      window.addEventListener('beforeunload', confirmLeave);

      return () => {
        window.removeEventListener('beforeunload', confirmLeave);
      };
    }
  }, [isFormModified]);
  return (
    <>
      <div className='row'>
        <div className='sidebar1 col-2'>
          <Sidebar1 />
        </div>
        <div className='right col-10'>
          <div className='row mx-3 my-3'>
            <div className='col-lg-4'>
              <label className='entry text-lg-center text-sm-start w-100 align-content-center h-100 mt-1'>Your Roll No</label>
            </div>
            <div className='col-lg-8'>
              <input
                className='my-2 w-100 rounded-2 p-1'
                placeholder='Roll No'
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className='row mx-3 my-3'>
            <div className='col-lg-4'>
              <label className='entry text-lg-center text-sm-start w-100 align-content-center h-100 mt-1'>Username</label>
            </div>
            <div className='col-lg-8'>
              <input
                className='my-2 w-100 rounded-2 p-1'
                placeholder='Name'
                onChange={handleFormChange}
              />
            </div>
          </div>
          {/* ... Repeat similar blocks for other form inputs ... */}
          <div className='row mx-3 my-3'>
            <div className='col-lg-4'>
              <label className='entry text-lg-center text-sm-start w-100 align-content-center h-100 mt-1'>Category</label>
            </div>
            <div className='col-lg-8'>
              <select
                className='my-2 w-100 p-1 rounded-2'
                placeholder='Category'
                onChange={handleFormChange}
              >
                <option value="Academic">Academic</option>
                <option value="Classroom Maintenance">Classroom Maintenance</option>
                <option value="Lab">Lab</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className='row mx-3 my-3'>
            <div className='col-lg-4'>
              <label className='text-lg-center text-sm-start w-100 '>Description</label>
            </div>
            <div className='col-lg-8'>
              <textarea
                className='w-100'
                placeholder='Description'
                rows={5}
                cols={20}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className='mx-5 py-2 float-end'>
            <input
              type='submit'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintEntry;
