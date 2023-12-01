import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const Home=()=>{

  const navigate= useNavigate();
  return ()=>{
    <div>
      <Button onClick={navigate('/admin/login')}> Go </Button>
    </div>
  }
}

export default Home;