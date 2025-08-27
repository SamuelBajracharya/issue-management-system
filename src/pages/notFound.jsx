import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "antd";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-description">
        Oops! The page you are looking for doesn’t exist. It might have been removed, had its name changed,
        or is temporarily unavailable. You can go back tor check other pages.
      </p>
      <Button type="primary" className="notfound-button" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
