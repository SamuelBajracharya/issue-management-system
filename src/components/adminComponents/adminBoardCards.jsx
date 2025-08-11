import React from 'react'
import {Tag} from "antd";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const AdminBoardCards = ({item}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: item.issue_id,});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="issue-list-item admin-board-card"
    >
      <p>#{item.issue_id}</p>
      <h2>{item.title}</h2>
      <div className="issue-bottom">
        <div>
          <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
          <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
        </div>
      </div>
    </div>
  );
};

export default AdminBoardCards;
