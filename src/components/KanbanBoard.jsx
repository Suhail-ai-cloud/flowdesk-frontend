import React, { useMemo, useCallback, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./styles/KanbanBoard.css";

const COLUMNS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed"
};

export default function KanbanBoard({ tasks, refresh, onEdit }) {

  const { user } = useContext(AuthContext);

  const groupedTasks = useMemo(() => {

    const group = {
      PENDING: [],
      IN_PROGRESS: [],
      COMPLETED: []
    };

    tasks.forEach(task => group[task.status]?.push(task));

    return group;

  }, [tasks]);

  const onDragEnd = useCallback(async (result) => {

    if (!result.destination) return;

    const task = tasks.find(
      t => t.id.toString() === result.draggableId
    );

    const isAssigned =
      task.assigned_users?.some(u => u.id === user.id);

    const isOwner =
      task.project_owner === user.id;

    if (!isAssigned && !isOwner) return;

    await api.patch(
      `tasks/${task.id}/`,
      { status: result.destination.droppableId }
    );

    refresh();

  }, [tasks, refresh, user]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="kanban-board">

        {Object.entries(COLUMNS).map(([statusKey, label]) => (

          <Droppable droppableId={statusKey} key={statusKey}>
            {(provided) => (

              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >

                <h3 className="column-title">{label}</h3>

                {groupedTasks[statusKey].map((task, index) => (

                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (

                      <div
                        className="kanban-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => onEdit(task)}
                      >

                        <div className="task-header">

                          <span className={`priority ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>

                          {task.due_date && (
                            <span className="due-date">
                              {task.due_date}
                            </span>
                          )}

                        </div>

                        <h4 className="task-title">
                          {task.title}
                        </h4>

                        <div className="avatar-stack">

                          {task.assigned_users?.map(u => (

                            <div key={u.id} className="avatar">
                              {u.name[0]}
                            </div>

                          ))}

                        </div>

                      </div>

                    )}
                  </Draggable>

                ))}

                {provided.placeholder}

              </div>

            )}
          </Droppable>

        ))}

      </div>

    </DragDropContext>
  );
}