import React, {useState} from "react";
import {Button, Checkbox, Input, message} from "antd";
import {useCreateSubtask, useCompleteSubtask} from "../../hooks/useAdminIssues.js";
import {PlusOutlined} from "@ant-design/icons";

const SubtaskSection = ({subTasks = [], issueId}) => {
  const [adding, setAdding] = useState(false);
  const [newTask, setNewTask] = useState("");

  const {mutate: createSubtask, isLoading: creating} = useCreateSubtask();
  const {mutate: completeSubtask, isLoading: completing} = useCompleteSubtask();

  const addSubtask = () => setAdding(true);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && newTask.trim()) {
      createSubtask(
        {issueId, subtaskData: {task: newTask}},
        {
          onSuccess: () => {
            message.success("Subtask created!");
            setNewTask("");
            setAdding(false);
          },
          onError: () => {
            message.error("Failed to create subtask");
          },
        }
      );
    }
  };

  const handleComplete = (subtaskId) => {
    completeSubtask(
      {issueId, subtaskId},
      {
        onSuccess: () => message.success("Subtask marked complete!"),
        onError: () => message.error("Failed to complete subtask"),
      }
    );
  };

  return (
    <div className="admin-issues-details-subtasks">
      <div className="admin-issues-subtasks-heading">
        <h2>Subtasks</h2>
        <Button
          type="primary"
          icon={<PlusOutlined/>}
          onClick={addSubtask}
          disabled={adding}
        >
          Add Subtask
        </Button>
      </div>

      <div className="admin-issues-subtasks-list">
        {subTasks.map((subtask) => (
          <div
            key={subtask.subTaskId}
            className={`admin-issues-subtask ${
              subtask.status === "COMPLETED" ? "completed" : ""
            }`}
            onClick={() => handleComplete(subtask.subTaskId)}
          >
            <Checkbox checked={subtask.status === "COMPLETED"}/>
            <Input value={subtask.task} disabled/>
          </div>
        ))}


        {adding && (
          <div className="admin-issues-subtask new">
            <Checkbox disabled/>
            <Input
              autoFocus
              placeholder="Write subtask here..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={creating}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtaskSection;
