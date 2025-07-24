import React from 'react'
import {Tooltip} from "antd";
import {MoonFilled, SunFilled} from "@ant-design/icons";
import {useDarkToggleStore} from "../store/uiStore.js";

const ToggleButton = () => {
  const {isDarkMode, setIsDarkMode} = useDarkToggleStore();

  return (
    <>
      <Tooltip title="Toggle theme">
        {isDarkMode ? (
          <SunFilled className="moon-icon" onClick={setIsDarkMode}/>
        ) : (
          <MoonFilled className="moon-icon" onClick={setIsDarkMode}/>
        )}
      </Tooltip>
    </>
  )
}
export default ToggleButton
