import React from 'react'
import AdminBoardColumn from "../../components/adminComponents/adminBoardColumn.jsx";

const columns = ['P1', 'P2', 'P3', 'Not Assigned']
const AdminMyBoard = () => {
  return (
    <div className="admin-my-board">
      {
        columns.map((column, index) => (
          <AdminBoardColumn key={index} column_title={column} data={null}/>
        ))
      }
    </div>
  )
}
export default AdminMyBoard
