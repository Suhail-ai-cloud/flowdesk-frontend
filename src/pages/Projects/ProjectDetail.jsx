
// import React, { useEffect, useState, useCallback } from "react";
// import api from "../../api/axios";
// import { useParams } from "react-router-dom";
// import CreateTaskModal from "../../components/CreateTaskModal";
// import EditTaskModal from "../../components/EditTaskModal";
// import KanbanBoard from "../../components/KanbanBoard";
// import ProjectMembers from "../../components/ProjectMembers";
// import AddProjectMember from "../../components/AddProjectMember";
// import "./styles/ProjectDetail.css";

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     status: "",
//     priority: "",
//     due_before: "",
//     due_after: ""
//   });

//   const fetchTasks = useCallback(() => {
//     let query = `tasks/?project=${id}`;
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value) query += `&${key}=${value}`;
//     });
//     api.get(query).then(res => setTasks(res.data));
//   }, [filters, id]);

//   const refreshProject = useCallback(() => {
//     setLoading(true);
//     api.get(`projects/${id}/`)
//       .then(res => setProject(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   useEffect(() => {
//     refreshProject();
//   }, [refreshProject]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   if (loading) return <div className="loader">Loading project...</div>;

//   return (
//     <div className="page-container project-detail-page">

//       {/* Project Header */}
//       <div className="section-card">
//         <h2 className="page-title">{project.name}</h2>
//         <p className="section-description">{project.description}</p>
//       </div>
// <button
//   className="btn-secondary"
//   onClick={() => api.get("tasks/my_tasks/").then(res => setTasks(res.data))}
// >
//   Show My Tasks
// </button>

//       {/* Members */}
//       <div className="section-card">
//         <AddProjectMember projectId={id} refresh={refreshProject} />
//         <ProjectMembers projectId={id} />
//       </div>

//       {/* Filters */}
//       <div className="section-card">
//         <div className="filters-grid">
//           <select className="input-field" onChange={e => setFilters({...filters, status: e.target.value})}>
//             <option value="">All Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="IN_PROGRESS">In Progress</option>
//             <option value="COMPLETED">Completed</option>
//           </select>

//           <select className="input-field" onChange={e => setFilters({...filters, priority: e.target.value})}>
//             <option value="">All Priority</option>
//             <option value="LOW">Low</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="HIGH">High</option>
//           </select>

//           <input type="date" className="input-field" onChange={e => setFilters({...filters, due_after: e.target.value})} />
//           <input type="date" className="input-field" onChange={e => setFilters({...filters, due_before: e.target.value})} />

//           <button className="btn-secondary" onClick={() => setFilters({status:"",priority:"",due_before:"",due_after:""})}>
//             Clear
//           </button>
//         </div>
//       </div>

//       {/* Task Actions */}
//       <div className="section-header">
//         <h3>Kanban Board</h3>
//         <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
//           + Add Task
//         </button>
//       </div>

//       <KanbanBoard tasks={tasks} refresh={fetchTasks} onEdit={setEditTask} />

//       {editTask && (
//         <EditTaskModal
//           task={editTask}
//           members={project.members}
//           close={() => setEditTask(null)}
//           refresh={fetchTasks}
//         />
//       )}

//       {isCreateOpen && (
//         <CreateTaskModal
//           projectId={id}
//           members={project.members}
//           close={() => setIsCreateOpen(false)}
//           refresh={fetchTasks}
//         />
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState, useCallback, useContext } from "react";
// import api from "../../api/axios";
// import { useParams } from "react-router-dom";
// import CreateTaskModal from "../../components/CreateTaskModal";
// import EditTaskModal from "../../components/EditTaskModal";
// import KanbanBoard from "../../components/KanbanBoard";
// import ProjectMembers from "../../components/ProjectMembers";
// import AddProjectMember from "../../components/AddProjectMember";
// import { AuthContext } from "../../context/AuthContext";
// import "./styles/ProjectDetail.css";

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showMine, setShowMine] = useState(false);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [editTask, setEditTask] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = useCallback(() => {
//     api.get(`tasks/?project=${id}`).then(res => setTasks(res.data));
//   }, [id]);

//   const refreshProject = useCallback(() => {
//     setLoading(true);
//     api.get(`projects/${id}/`)
//       .then(res => setProject(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   useEffect(() => { refreshProject(); }, [refreshProject]);
//   useEffect(() => { fetchTasks(); }, [fetchTasks]);

//   if (loading) return <div className="loader">Loading project...</div>;

//   const visibleTasks = showMine
//     ? tasks.filter(t => t.assigned_users?.some(u => u.id === user.id))
//     : tasks;

//   return (
//     <div className="page-container project-detail-page">

//       <div className="section-card">
//         <h2>{project.name}</h2>
//         <p>{project.description}</p>
//       </div>

//       <button className="btn-secondary" onClick={() => setShowMine(!showMine)}>
//         {showMine ? "Show All Tasks" : "Show My Tasks"}
//       </button>

//       <div className="section-card">
//         <AddProjectMember projectId={id} refresh={refreshProject} />
//         <ProjectMembers projectId={id} />
//       </div>

//       <div className="section-header">
//         <h3>Kanban Board</h3>
//         <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
//           + Add Task
//         </button>
//       </div>

//       <KanbanBoard tasks={visibleTasks} refresh={fetchTasks} onEdit={setEditTask} />

//       {editTask && (
//         <EditTaskModal
//           task={editTask}
//           members={project.members}
//           close={() => setEditTask(null)}
//           refresh={fetchTasks}
//         />
//       )}

//       {isCreateOpen && (
//         <CreateTaskModal
//           projectId={id}
//           members={project.members}
//           close={() => setIsCreateOpen(false)}
//           refresh={fetchTasks}
//         />
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback, useContext } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

import CreateTaskModal from "../../components/CreateTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import KanbanBoard from "../../components/KanbanBoard";
import ProjectMembers from "../../components/ProjectMembers";
import AddProjectMember from "../../components/AddProjectMember";

import { AuthContext } from "../../context/AuthContext";

import { FiPlus, FiFilter } from "react-icons/fi";

import "./styles/ProjectDetail.css";

export default function ProjectDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showMine, setShowMine] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     Fetch Tasks
  ========================= */

  const fetchTasks = useCallback(() => {

    api.get(`tasks/?project=${id}`)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));

  }, [id]);

  /* =========================
     Fetch Project
  ========================= */

  const refreshProject = useCallback(() => {

    setLoading(true);

    api.get(`projects/${id}/`)
      .then(res => setProject(res.data))
      .catch(err => {

        if (err.response?.status === 403) {
          alert("You don't have access to this project");
          navigate("/projects");
        }

        else if (err.response?.status === 404) {
          alert("Project not found");
          navigate("/projects");
        }

      })
      .finally(() => setLoading(false));

  }, [id, navigate]);

  /* =========================
     Load Data
  ========================= */

  useEffect(() => {
    refreshProject();
  }, [refreshProject]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /* =========================
     Loading State
  ========================= */

  if (loading) {
    return <div className="loader">Loading project...</div>;
  }

  /* =========================
     Prevent Crash if Project Null
  ========================= */

  if (!project) {
    return <div className="loader">Project unavailable</div>;
  }

  /* =========================
     Task Filter
  ========================= */

  const visibleTasks = showMine
    ? tasks.filter(t =>
        t.assigned_users?.some(u => u.id === user?.id)
      )
    : tasks;

  /* =========================
     Render
  ========================= */

  return (
    <div className="project-page">

      {/* ================= HEADER ================= */}

      <div className="project-header">

        <div>
          <h1>{project.name}</h1>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="header-actions">

          <button
            className="btn-secondary"
            onClick={() => setShowMine(!showMine)}
          >
            <FiFilter />
            {showMine ? "Show All" : "My Tasks"}
          </button>

          <button
            className="btn-primary"
            onClick={() => setIsCreateOpen(true)}
          >
            <FiPlus />
            Add Task
          </button>

        </div>

      </div>

      {/* ================= MEMBERS ================= */}

      <div className="members-section card">

        <AddProjectMember
          projectId={id}
          refresh={refreshProject}
        />

        <ProjectMembers
          projectId={id}
        />

      </div>

      {/* ================= KANBAN ================= */}

      <div className="kanban-section">

        <h2 className="section-title">Kanban Board</h2>

        <KanbanBoard
          tasks={visibleTasks}
          refresh={fetchTasks}
          onEdit={setEditTask}
        />

      </div>

      {/* ================= EDIT TASK ================= */}

      {editTask && (

        <EditTaskModal
          task={editTask}
          members={project.members}
          close={() => setEditTask(null)}
          refresh={fetchTasks}
        />

      )}

      {/* ================= CREATE TASK ================= */}

      {isCreateOpen && (

        <CreateTaskModal
          projectId={id}
          members={project.members}
          close={() => setIsCreateOpen(false)}
          refresh={fetchTasks}
        />

      )}

    </div>
  );
}