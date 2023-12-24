import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Typography } from 'antd';
const CreatePost= () => {
      return (
        <>
              <Typography.Title level={1}>
                Post About The Progress Event:
                
              </Typography.Title>
              <form>
                <label for="wor">Hello</label>
                  <textarea rows={4} cols={5} id='wor'/>
                </form>
        </>
      );
   }
export default CreatePost;