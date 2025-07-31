import React from 'react'
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <Spin indicator={<LoadingOutlined spin/>} size="small"/>
    </div>
  )
}
export default LoadingSpinner
