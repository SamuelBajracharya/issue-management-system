import React from 'react'
import {ConfigProvider} from "antd";
import AppRouter from "./Router.jsx";
import {ToggleThemes} from "./utils/toggleThemes.js";


const App = () => {
  ToggleThemes();
  const themeConfig = {
    token: {
      fontFamily: 'Montserrat, sans-serif',
    },

  }
  return (
    <ConfigProvider theme={themeConfig}>
      <AppRouter/>
    </ConfigProvider>
  )
}
export default App
