import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const CreatePost= () => {
      return (
        <>
        <div className='sidebar1 col-2 '>
              <Sidebar1/>
          </div>
          <div className='right col-10 float-end'>
              <h1>
                Post About The Progress Event:
                
              </h1>
              <form>
                <label for="wor">Hello</label>
                  <textarea rows={4} cols={5} id='wor'/>
                </form>
          </div>
        </>
      );
   }
export default CreatePost;