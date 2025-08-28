import React from 'react';
import {PlusOutlined} from "@ant-design/icons";
import AdminBoardCards from "./adminBoardCards.jsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";

const AdminBoardColumn = ({column_title, data}) => {
  const isUnassigned = column_title === 'P4';

  const {setNodeRef, isOver} = useDroppable({
    id: column_title,
  });

  return (
    <div
      ref={setNodeRef}
      className={`admin-board-column ${isUnassigned ? 'admin-board-column-dashed' : 'admin-board-column-normal'} ${isOver ? 'column-over' : ''}`}
    >
      <div className="column-header">
        <h1>{column_title === "P4" ? "Not Assigned" : column_title}</h1>
        {isUnassigned && (

          <PlusOutlined/>
        )}
      </div>

      <SortableContext items={data.map(item => item.issue_id)} strategy={verticalListSortingStrategy}>
        {data.length > 0 ? (
          data.map((item) => (
            <AdminBoardCards item={item} key={item.issue_id}/>
          ))
        ) : (
          <div className="empty-drop-zone">
            Drop Here
          </div>
        )}
      </SortableContext>
    </div>
  );
};

export default AdminBoardColumn;
