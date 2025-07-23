import React from 'react'
import {AlertFilled} from "@ant-design/icons";

const Logo = (collapsed) => {
  return (

    <div className="logo">
      <AlertFilled className="logo-icon"/>
      <h1 className={collapsed ? "logo-text-collapsed" : "logo-text"}>IssueDesk</h1>
    </div>)
}
export default Logo
