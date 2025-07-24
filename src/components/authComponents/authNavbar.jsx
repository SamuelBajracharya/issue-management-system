import React from 'react'
import Logo from "../logo.jsx";
import ToggleButton from "../toggleButton.jsx";

const AuthNavbar = () => {
  return (
    <div className="auth-navbar">
      <Logo isAuth={true}/>
      <div className="toggle-container">
        <ToggleButton/>
      </div>
    </div>
  )
}
export default AuthNavbar
