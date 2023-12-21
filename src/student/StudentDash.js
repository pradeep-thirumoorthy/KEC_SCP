import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const StudentDash = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <h3 style={{fontFamily:"monospace"}}>Loading...</h3>
      ) : (
        <>
          <h1>Student Dashboard</h1>
        </>
        )}
    </>
  );
};

export default StudentDash;
