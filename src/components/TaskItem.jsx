import React from "react";

export default function TaskItem({ task }) {
  return (
    <div className={`task-item ${task.overdue ? "overdue" : ""}`}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: <span className={`badge ${task.status.toLowerCase()}`}>{task.status}</span></p>
      <p>Priority: {task.priority}</p>
      <p>Due: {task.due_date}</p>
      <p>Assigned: {task.assigned_to_name || "Unassigned"}</p>
    </div>
  );
}
