import React, {useEffect} from 'react'
import {ConfigProvider} from "antd";
import AppRouter from "./Router.jsx";
import {ToggleThemes} from "./utils/toggleThemes.js";
import useResponsiveStore from "./store/responsiveStore.js";


const App = () => {
  ToggleThemes();
  const themeConfig = {
    token: {
      fontFamily: 'Montserrat, sans-serif',
    },

  }
  const initResizeListener = useResponsiveStore((s) => s.initResizeListener);

  useEffect(() => {
    const cleanup = initResizeListener();
    return cleanup;
  }, [initResizeListener]);
  return (
    <ConfigProvider theme={themeConfig}>
      <AppRouter/>
    </ConfigProvider>
  )
}
export default App
