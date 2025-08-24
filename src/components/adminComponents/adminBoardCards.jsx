import React from "react";
import {Tag} from "antd";
import {HolderOutlined} from "@ant-design/icons";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useDetailsOverlay} from "../../store/overlayStore.js";

const AdminBoardCards = ({item}) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: item.issue_id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    position: "relative",
  };

  const openDetailsOverlay = useDetailsOverlay(
    (state) => state.openDetailsOverlay
  );

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="issue-list-item admin-board-card"
    >
      <p>#{item.issue_id}</p>

      <h2
        onClick={(e) => {
          e.stopPropagation();
          openDetailsOverlay(item.issue_id);
        }}
        style={{cursor: "pointer"}}
      >
        {item.title}
      </h2>

      <div className="issue-bottom">
        <div>
          <>Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag></>
          <>Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag></>
        </div>
      </div>

      <HolderOutlined
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          fontSize: "16px",
          color: "#888",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default AdminBoardCards;
