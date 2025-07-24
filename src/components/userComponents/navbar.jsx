import React from 'react';
import {Avatar, Tooltip} from "antd";
import {MoonFilled, SunFilled} from "@ant-design/icons";
import {useLocation} from 'react-router-dom';
import {useDarkToggleStore} from "../../store/uiStore.js";

export const Navbar = () => {
  const {isDarkMode, setIsDarkMode} = useDarkToggleStore();

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
          {isDarkMode ? (
            <SunFilled className="moon-icon" onClick={setIsDarkMode}/>
          ) : (
            <MoonFilled className="moon-icon" onClick={setIsDarkMode}/>
          )}
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
