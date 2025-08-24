import React, {useState, useEffect} from "react";
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
import {useAdminIssues, useUpdatePriority} from "../../hooks/useAdminIssues.js";

const columns = ["P1", "P2", "P3", "P4"];

const AdminMyBoard = () => {
  const {data: ackIssues, isLoading, isError, error} = useAdminIssues();
  const [issues, setIssues] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const isDetailsOverlay = useDetailsOverlay((state) => state.isDetailsOverlay);
  const updatePriorityMutation = useUpdatePriority();

  useEffect(() => {
    if (ackIssues) {
      const initIssues = {};
      columns.forEach((col) => {
        initIssues[col] = ackIssues[col] || [];
      });
      setIssues(initIssues);
    }
  }, [ackIssues]);

  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {delay: 150, tolerance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 150, tolerance: 5}})
  );

  const findColumn = (id) =>
    Object.keys(issues).find((col) => issues[col].some((i) => i.issue_id === id));

  const handleDragStart = ({active}) => {
    const column = findColumn(active.id);
    const item = issues[column]?.find((i) => i.issue_id === active.id);
    setActiveCard(item || null);
  };

  const handleDragOver = ({active, over}) => {
    if (!over) return;
    const activeCol = findColumn(active.id);
    const overCol = findColumn(over.id) || over.id;
    if (!activeCol || !overCol || activeCol === overCol) return;

    setIssues((prev) => {
      const activeItems = [...prev[activeCol]];
      const overItems = [...prev[overCol]];
      const activeIndex = activeItems.findIndex((i) => i.issue_id === active.id);
      const [movedItem] = activeItems.splice(activeIndex, 1);

      // Update priority locally
      movedItem.priority = overCol;
      overItems.push(movedItem);

      // Trigger backend mutation
      if (updatePriorityMutation?.mutate) {
        updatePriorityMutation.mutate({
          id: movedItem.issue_id,
          data: {
            priority: overCol,
            impact: movedItem.impact,
            urgency: movedItem.urgency,
          },
        });
      }

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
      const oldIndex = issues[activeCol].findIndex((i) => i.issue_id === active.id);
      const newIndex = issues[overCol].findIndex((i) => i.issue_id === over.id);
      setIssues((prev) => ({
        ...prev,
        [overCol]: arrayMove(prev[overCol], oldIndex, newIndex),
      }));
    }
    setActiveCard(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message || "Failed to load issues"}</div>;

  return (
    <div className="admin-my-board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <SortableContext
            key={column}
            items={issues[column]?.map((i) => i.issue_id) || []}
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
