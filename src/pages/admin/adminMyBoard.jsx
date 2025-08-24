import React, {useState} from "react";
import AdminBoardColumn from "../../components/adminComponents/adminBoardColumn.jsx";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AdminBoardCards from "../../components/adminComponents/adminBoardCards.jsx";
import {useDetailsOverlay} from "../../store/overlayStore.js";
import AdminBoardDetails from "../../components/adminComponents/adminBoardDetails.jsx";

const initialIssues = {
  P1: [
    {
      issue_id: "24",
      title: "Login page not loading on mobile devices",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    },
    {
      issue_id: "23",
      title: "Payment gateway timeout during checkout",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    },
    {
      issue_id: "26",
      title: "Database connection error causing downtime",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    },
    {
      issue_id: "ISS-1007",
      title: "Critical security vulnerability in user authentication",
      urgency: "HIGH",
      impact: "HIGH",
      priority: "P1"
    },
  ],
  P2: [
    {
      issue_id: "19",
      title: "Search results returning outdated data",
      urgency: "MEDIUM",
      impact: "MEDIUM",
      priority: "P2"
    },
    {
      issue_id: "18",
      title: "User dashboard taking too long to load",
      urgency: "MEDIUM",
      impact: "MEDIUM",
      priority: "P2"
    },
    {
      issue_id: "17",
      title: "Image carousel not displaying correctly in Safari",
      urgency: "MEDIUM",
      impact: "MEDIUM",
      priority: "P2"
    },
  ],
  P3: [
    {
      issue_id: "11",
      title: "Notification emails sent twice to users",
      urgency: "MEDIUM",
      impact: "LOW",
      priority: "P3"
    },
    {
      issue_id: "ISS-1010",
      title: "UI text misaligned in settings page",
      urgency: "LOW",
      impact: "MEDIUM",
      priority: "P3"
    },
    {
      issue_id: "ISS-1011",
      title: "Tooltip not appearing on hover in analytics chart",
      urgency: "LOW",
      impact: "MEDIUM",
      priority: "P3"
    },
  ],
  P4: [
    {
      issue_id: "ISS-1003",
      title: "Profile picture upload failing for large files",
      urgency: "LOW",
      impact: "LOW",
      priority: "P4"
    },
    {issue_id: "ISS-1012", title: "Minor typo in the FAQ section", urgency: "LOW", impact: "LOW", priority: "P4"},
    {
      issue_id: "ISS-1013",
      title: "Footer links misaligned on small screens",
      urgency: "LOW",
      impact: "LOW",
      priority: "P4"
    },
  ],
};

const columns = ["P1", "P2", "P3", "P4"];

const AdminMyBoard = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [activeCard, setActiveCard] = useState(null);
  const isDetailsOverlay = useDetailsOverlay((state) => state.isDetailsOverlay);

  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {delay: 150, tolerance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 150, tolerance: 5}})
  );

  const findColumn = (id) => Object.keys(issues).find(col => issues[col].some(i => i.issue_id === id));

  const handleDragStart = ({active}) => {
    const column = findColumn(active.id);
    const item = issues[column].find(i => i.issue_id === active.id);
    setActiveCard(item);
  };

  const handleDragOver = ({active, over}) => {
    if (!over) return;
    const activeCol = findColumn(active.id);
    const overCol = findColumn(over.id) || over.id;
    if (!activeCol || !overCol || activeCol === overCol) return;

    setIssues(prev => {
      const activeItems = [...prev[activeCol]];
      const overItems = [...prev[overCol]];
      const activeIndex = activeItems.findIndex(i => i.issue_id === active.id);
      const [movedItem] = activeItems.splice(activeIndex, 1);
      movedItem.priority = overCol;
      overItems.push(movedItem);
      return {...prev, [activeCol]: activeItems, [overCol]: overItems};
    });
  };

  const handleDragEnd = ({active, over}) => {
    if (!over) {
      setActiveCard(null);
      return;
    }
    const activeCol = findColumn(active.id);
    const overCol = findColumn(over.id);
    if (activeCol && overCol && activeCol === overCol) {
      const oldIndex = issues[activeCol].findIndex(i => i.issue_id === active.id);
      const newIndex = issues[overCol].findIndex(i => i.issue_id === over.id);
      setIssues(prev => ({...prev, [overCol]: arrayMove(prev[overCol], oldIndex, newIndex)}));
    }
    setActiveCard(null);
  };

  return (
    <div className="admin-my-board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map(column => (
          <SortableContext
            key={column}
            items={issues[column].map(i => i.issue_id)}
            strategy={verticalListSortingStrategy}
          >
            <AdminBoardColumn column_title={column} data={issues[column] || []}/>
          </SortableContext>
        ))}

        <DragOverlay>
          {activeCard && (
            <div style={{opacity: 0.7}} className="drag-outline">
              <AdminBoardCards item={activeCard}/>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {isDetailsOverlay && <AdminBoardDetails/>}
    </div>
  );
};

export default AdminMyBoard;
