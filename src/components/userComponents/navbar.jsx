import React from 'react';
import {Avatar, Tooltip} from "antd";
import {MoonFilled} from "@ant-design/icons";
import {useLocation} from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  let path = location.pathname || "dashboard";
  const firstSegment = path.split('/')[1];

  if (firstSegment === "issue") {
    path = "Issues";
  } else {
    path = firstSegment || "Dashboard";
  }
  
  return (
    <div className="navbar">
      <h1>{path}</h1>
      <div className="profile-div">
        <Tooltip title="Toggle theme">
          <MoonFilled className="moon-icon"/>
        </Tooltip>
        Samuel Baj.
        <div className="profile-image">
          <img
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};
