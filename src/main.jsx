import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'antd/dist/reset.css';
import './styles/main.scss';
import {BrowserRouter} from "react-router-dom";
import App from "./app.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
