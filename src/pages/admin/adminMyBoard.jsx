// AdminMyBoard.jsx
import React, {useState} from "react";
import AdminBoardColumn from "../../components/adminComponents/adminBoardColumn.jsx";
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import AdminBoardCards from "../../components/adminComponents/adminBoardCards.jsx";

const initialIssues = {
  P1: [
    {
      issue_id: "ISS-1001",
      title: "Login page not loading on mobile devices",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    },
    {
      issue_id: "ISS-1004",
      title: "Payment gateway timeout during checkout",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    }
  ],
  P2: [
    {
      issue_id: "ISS-1002",
      title: "Search results returning outdated data",
      urgency: "MEDIUM",
      impact: "MEDIUM",
      priority: "P2"
    }
  ],
  P3: [
    {
      issue_id: "ISS-1005",
      title: "Notification emails sent twice to users",
      urgency: "MEDIUM",
      impact: "LOW",
      priority: "P3"
    }
  ],
  P4: [
    {
      issue_id: "ISS-1003",
      title: "Profile picture upload failing for large files",
      urgency: "LOW",
      impact: "LOW",
      priority: "P4"
    }
  ]
};

const columns = ["P1", "P2", "P3", "P4"];

const AdminMyBoard = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [activeCard, setActiveCard] = useState(null);

  const findColumn = (id) => {
    return Object.keys(issues).find((col) =>
      issues[col].some((item) => item.issue_id === id)
    );
  };

  const handleDragStart = (event) => {
    const {active} = event;
    const column = findColumn(active.id);
    const item = issues[column].find((i) => i.issue_id === active.id);
    setActiveCard(item);
  };

  const handleDragOver = (event) => {
    const {active, over} = event;
    if (!over) return;

    const activeCol = findColumn(active.id);
    const overCol = findColumn(over.id) || over.id; // over.id could be column id if empty

    if (!activeCol || !overCol || activeCol === overCol) return;

    setIssues((prev) => {
      const activeItems = [...prev[activeCol]];
      const overItems = [...prev[overCol]];

      const activeIndex = activeItems.findIndex((i) => i.issue_id === active.id);
      const [movedItem] = activeItems.splice(activeIndex, 1);

      movedItem.priority = overCol;

      // Drop at the end of over column for simplicity
      overItems.push(movedItem);

      return {
        ...prev,
        [activeCol]: activeItems,
        [overCol]: overItems,
      };
    });
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if (!over) {
      setActiveCard(null);
      return;
    }

    const activeCol = findColumn(active.id);
    const overCol = findColumn(over.id);

    if (activeCol && overCol && activeCol === overCol) {
      const oldIndex = issues[activeCol].findIndex((i) => i.issue_id === active.id);
      const newIndex = issues[overCol].findIndex((i) => i.issue_id === over.id);
      setIssues((prev) => ({
        ...prev,
        [overCol]: arrayMove(prev[overCol], oldIndex, newIndex),
      }));
    }

    setActiveCard(null);
  };

  return (
    <div className="admin-my-board">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <SortableContext
            key={column}
            items={issues[column].map((item) => item.issue_id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminBoardColumn
              column_title={column}
              data={issues[column] || []}
            />
          </SortableContext>
        ))}

        <DragOverlay>
          {activeCard ? (
            <div style={{opacity: 0.7,}} className="drag-outline">
              <AdminBoardCards item={activeCard}/>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default AdminMyBoard;
