import React from 'react'
import {ConfigProvider} from "antd";
import AppRouter from "./Router.jsx";


const App = () => {
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
