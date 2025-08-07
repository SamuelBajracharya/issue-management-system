import React from 'react'
import {PlusOutlined} from "@ant-design/icons";

const AdminBoardColumn = ({column_title, data}) => {
  const isUnassigned = column_title === 'Not Assigned';
  return (
    <div className={`admin-board-column ${isUnassigned ? 'admin-board-column-dashed' : 'admin-board-column-normal'}`}>
      <div className="column-header">
        <h1>{column_title}</h1>
        <PlusOutlined/>
      </div>
      <>
      </>
    </div>
  )
}
export default AdminBoardColumn
