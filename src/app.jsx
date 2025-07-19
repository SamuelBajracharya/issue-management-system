import React, {useState} from 'react'
import {ConfigProvider, theme} from "antd";
import AppRouter from "./Router.jsx";


const App = () => {
  const [isDark, setIsDark] = useState(false)
  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: isDark ? '#ffffff' : '#000000',
      colorBgBase: isDark ? '#000000' : '#E4E4E4',
      colorBgContainer: isDark ? '#2D2D2D' : '#FFFFFF',
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
