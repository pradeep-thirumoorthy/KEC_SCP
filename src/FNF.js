import React, { useEffect, useState } from 'react';

const FNF = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Display content after 1 second

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="fnf-container">
      {isLoading ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="error-content">
          <h1>404 Error</h1>
          <h3>The Page Not Found</h3>
        </div>
      )}
    </section>
  );
};

export default FNF;
