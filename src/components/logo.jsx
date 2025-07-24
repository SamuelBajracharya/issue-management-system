import React from 'react'
import {AlertFilled} from "@ant-design/icons";
import {useSidebarCollapsed} from "../store/uiStore.js";

const Logo = () => {
  const isSidebarCollapsed = useSidebarCollapsed(state => state.isSidebarCollapsed);
  return (

    <div className="logo">
      <AlertFilled className="logo-icon"/>
      <h1 className={isSidebarCollapsed ? "logo-text-collapsed" : "logo-text"}>IssueDesk</h1>
    </div>)
}
export default Logo
