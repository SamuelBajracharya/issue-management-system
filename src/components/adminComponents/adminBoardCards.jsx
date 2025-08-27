import React, {useState} from "react";
import {Tag} from "antd";
import {CheckOutlined, HolderOutlined} from "@ant-design/icons";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {useDetailsOverlay, useResolveOverlay} from "../../store/overlayStore.js";

const AdminBoardCards = ({item}) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: item.issue_id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
  };

  const openDetailsOverlay = useDetailsOverlay(
    (state) => state.openDetailsOverlay
  );
  const openResolveOverlay = useResolveOverlay(
    (state) => state.openResolveOverlay
  );

  const [resolved, setResolved] = useState(false);

  const handleResolveClick = (e) => {
    e.stopPropagation();
    setResolved(!resolved);
    openResolveOverlay(item.issue_id);
  };

  return (
    <div ref={setNodeRef} style={style} className="issue-list-item admin-board-card">
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

      <div {...attributes} {...listeners} className="draggable-bottom">
        <div className="tags-wrapper">
          Impact: <Tag className={`impact-tag ${item.impact.toLowerCase()}`}>{item.impact}</Tag>
          Urgency: <Tag className={`urgency-tag ${item.urgency.toLowerCase()}`}>{item.urgency}</Tag>
        </div>

        <HolderOutlined className="handle-icon"/>
      </div>
      <button
        className={`resolve-issue ${resolved ? "checked" : ""}`}
        onClick={handleResolveClick}
        style={{cursor: "pointer"}}
      >
        <CheckOutlined/>
      </button>
    </div>
  );
};

export default AdminBoardCards;
