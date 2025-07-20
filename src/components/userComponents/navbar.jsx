import React from 'react'
import {Avatar, Image, Tooltip} from "antd";
import {MoonFilled} from "@ant-design/icons";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Dashboard</h1>
      <div className="profile-div">
        <Tooltip title="Toggle theme">
          <MoonFilled className="moon-icon"/>
        </Tooltip>
        Samuel Baj.
        <div className="profile-image">
          <img
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="avatar"
          />
        </div>
      </div>
    </div>)
}
