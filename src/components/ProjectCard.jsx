// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import "./styles/ProjectCard.css";

// export default function ProjectCard({ project, refresh }) {
//   const navigate = useNavigate();
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async (e) => {
//     e.stopPropagation();
//     if (deleting) return;

//     setDeleting(true);
//     try {
//       await api.delete(`projects/${project.id}/`);
//       toast.success("Project deleted");
//       refresh();
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div
//       className="card project-card"
//       onClick={() => navigate(`/projects/${project.id}`)}
//     >
//       <div className="card-body">
//         <h3 className="card-title">{project.name}</h3>
//         <p className="card-desc">{project.description}</p>
//         <p className="card-progress">
//           Completion: <span>{Math.round(project.completion_percentage)}%</span>
//         </p>
//       </div>

//       <button
//         className="btn-danger delete-btn"
//         onClick={handleDelete}
//         disabled={deleting}
//       >
//         {deleting ? "Deleting..." : "Delete"}
//       </button>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiTrash2, FiFolder } from "react-icons/fi";
import "./styles/ProjectCard.css";

export default function ProjectCard({ project, refresh }) {

  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {

    e.stopPropagation();

    if (deleting) return;

    setDeleting(true);

    try {
      await api.delete(`projects/${project.id}/`);
      toast.success("Project deleted");
      refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)}
    >

      <div className="project-card-header">

        <div className="project-icon">
          <FiFolder />
        </div>

        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          <FiTrash2 />
        </button>

      </div>

      <h3 className="project-title">
        {project.name}
      </h3>

      <p className="project-description">
        {project.description || "No description"}
      </p>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${Math.round(project.completion_percentage)}%`
          }}
        />

      </div>

      <p className="progress-text">
        {Math.round(project.completion_percentage)}% Completed
      </p>

    </div>
  );
}