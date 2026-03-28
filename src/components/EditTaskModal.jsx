// import React, { useState } from "react";
// import api from "../api/axios";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";
// import "../pages/styles/projects.css";  
// import toast from "react-hot-toast";
// import CommentsSection from "./CommentsSection";
// import AttachmentsSection from "./AttachmentsSection";
// import ActivityTimeline from "./ActivityTimeline";

// export default function EditTaskModal({ task, members, close, refresh }) {
//   const [form, setForm] = useState({
//   ...task,
//   assigned_to: task.assigned_to || ""
// });


// const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


//   const handleUpdate = async () => {
//   await api.patch(`tasks/${task.id}/`, form);
//   toast.success("Task updated");
//   refresh();
//   close();
// };


//   const handleDelete = async () => {
//   await api.delete(`tasks/${task.id}/`);
//   toast.success("Task deleted");
//   refresh();
//   close();
// };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h3>Edit Task</h3>

//         <input
//           value={form.title}
//           onChange={e => setForm({...form, title:e.target.value})}
//         />

//         <textarea
//           value={form.description}
//           onChange={e => setForm({...form, description:e.target.value})}
//         />

//         <select
//           value={form.priority}
//           onChange={e => setForm({...form, priority:e.target.value})}
//         >
//           <option value="LOW">Low</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="HIGH">High</option>
//         </select>

//         <select
//           value={form.status}
//           onChange={e => setForm({...form, status:e.target.value})}
//         >
//           <option value="PENDING">Pending</option>
//           <option value="IN_PROGRESS">In Progress</option>
//           <option value="COMPLETED">Completed</option>
          
//         </select>
//         <select
//   value={form.assigned_to || ""}
//   onChange={e => setForm({...form, assigned_to: e.target.value})}
// >
//   <option value="">Unassigned</option>
//   {members.map(m => (
//     <option key={m.id} value={m.id}>{m.name}</option>
//   ))}
// </select>

//         <AttachmentsSection taskId={task.id} />

//         <CommentsSection taskId={task.id} />

//         <button onClick={handleUpdate}>Save</button>
//        <button
//   onClick={() => setShowDeleteConfirm(true)}
//   style={{ background: "red", color: "white" }}
// >
//   Delete
// </button>
// {showDeleteConfirm && (
//   <ConfirmDeleteModal
//     message="Are you sure you want to delete this task?"
//     onConfirm={handleDelete}
//     onCancel={() => setShowDeleteConfirm(false)}
//   />
// )}

//         <button onClick={close}>Cancel</button>
//         <ActivityTimeline taskId={task.id} />
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";
// import CommentsSection from "./CommentsSection";
// import AttachmentsSection from "./AttachmentsSection";
// import ActivityTimeline from "./ActivityTimeline";
// import "./styles/TaskModal.css";

// export default function EditTaskModal({ task, members, close, refresh }) {
//   const [loading, setLoading] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const [form, setForm] = useState({ ...task, assigned_to: task.assigned_to || "" });

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       await api.patch(`tasks/${task.id}/`, form);
//       toast.success("Task updated");
//       refresh();
//       close();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     await api.delete(`tasks/${task.id}/`);
//     toast.success("Task deleted");
//     refresh();
//     close();
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal modal-xl scrollable-modal">

//         <h3 className="modal-title">Edit Task</h3>

//         <div className="form-grid">
//           <input className="input-field" value={form.title} onChange={e => setForm({...form, title:e.target.value})} />
//           <textarea className="input-field" value={form.description} onChange={e => setForm({...form, description:e.target.value})} />

//           <select className="input-field" value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>
//             <option value="LOW">Low</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="HIGH">High</option>
//           </select>

//           <select className="input-field" value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
//             <option value="PENDING">Pending</option>
//             <option value="IN_PROGRESS">In Progress</option>
//             <option value="COMPLETED">Completed</option>
//           </select>

//           <select className="input-field" value={form.assigned_to} onChange={e => setForm({...form, assigned_to:e.target.value})}>
//             <option value="">Unassigned</option>
//             {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
//           </select>
//         </div>

//         <AttachmentsSection taskId={task.id} />
//         <CommentsSection taskId={task.id} />
//         <ActivityTimeline taskId={task.id} />

//         <div className="modal-actions">
//           <button className="btn-primary" onClick={handleUpdate}>{loading ? "Saving..." : "Save"}</button>
//           <button className="btn-danger" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
//           <button className="btn-secondary" onClick={close}>Cancel</button>
//         </div>

//         {showDeleteConfirm && (
//           <ConfirmDeleteModal
//             message="Are you sure you want to delete this task?"
//             onConfirm={handleDelete}
//             onCancel={() => setShowDeleteConfirm(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }import React, { useState, useContext } from "react";


// import React, { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import CommentsSection from "./CommentsSection";
// import AttachmentsSection from "./AttachmentsSection";
// import ActivityTimeline from "./ActivityTimeline";
// import "./styles/TaskModal.css";

// export default function EditTaskModal({ task, close, refresh }) {
//   const isOwner = task.isOwner;
//   const isAssigned = task.isAssigned;

//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     title: task.title,
//     description: task.description,
//     priority: task.priority,
//     status: task.status,
//   });

//   const handleUpdate = async () => {
//     let payload = {};

//     if (isOwner) {
//       payload = {
//         title: form.title,
//         description: form.description,
//         priority: form.priority,
//         status: form.status,
//       };
//     } else if (isAssigned) {
//       payload = { status: form.status };
//     }

//     setLoading(true);
//     try {
//       await api.patch(`tasks/${task.id}/`, payload);
//       toast.success("Task updated");
//       refresh();
//       close();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal modal-xl scrollable-modal">
//         <h3 className="modal-title">Task Details</h3>

//         {!isOwner && (
//           <div className="info-banner">
//             You can only change status, add comments and attachments.
//           </div>
//         )}

//         <div className="form-grid">

//           <label>Title</label>
//           <input
//             className="input-field"
//             value={form.title}
//             disabled={!isOwner}
//             onChange={e => setForm({ ...form, title: e.target.value })}
//           />

//           <label>Description</label>
//           <textarea
//             className="input-field"
//             value={form.description}
//             disabled={!isOwner}
//             onChange={e => setForm({ ...form, description: e.target.value })}
//           />

//           <label>Due Date</label>
//           <input
//             className="input-field"
//             value={task.due_date}
//             disabled
//           />

//           <label>Priority</label>
//           <select
//             className="input-field"
//             value={form.priority}
//             disabled={!isOwner}
//             onChange={e => setForm({ ...form, priority: e.target.value })}
//           >
//             <option value="LOW">Low</option>
//             <option value="MEDIUM">Medium</option>
//             <option value="HIGH">High</option>
//           </select>

//           <label>Status</label>
//           <select
//             className="input-field"
//             value={form.status}
//             disabled={!isAssigned && !isOwner}
//             onChange={e => setForm({ ...form, status: e.target.value })}
//           >
//             <option value="PENDING">Pending</option>
//             <option value="IN_PROGRESS">In Progress</option>
//             <option value="COMPLETED">Completed</option>
//           </select>
//         </div>

//         <AttachmentsSection taskId={task.id} disabled={!isAssigned && !isOwner} />
//         <CommentsSection taskId={task.id} disabled={!isAssigned && !isOwner} />
//         <ActivityTimeline taskId={task.id} />

//         <div className="modal-actions">
//           {(isOwner || isAssigned) && (
//             <button className="btn-primary" onClick={handleUpdate}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//           )}
//           <button className="btn-secondary" onClick={close}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import CommentsSection from "./CommentsSection";
import AttachmentsSection from "./AttachmentsSection";
import ActivityTimeline from "./ActivityTimeline";
import "./styles/TaskModal.css";

export default function EditTaskModal({ task, close, refresh }) {

  const isOwner = task.isOwner;
  const isAssigned = task.isAssigned;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  });

  const handleUpdate = async () => {

    let payload = {};

    if (isOwner) {
      payload = {
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: form.status
      };
    } else if (isAssigned) {
      payload = { status: form.status };
    }

    setLoading(true);

    try {
      await api.patch(`tasks/${task.id}/`, payload);
      toast.success("Task updated");
      refresh();
      close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">

      <div className="modal-card modal-xl">

        <div className="modal-header">
          <FiEdit className="modal-icon"/>
          <h2>Task Details</h2>
        </div>

        {!isOwner && (
          <div className="info-banner">
            You can only update the task status, add comments, and upload files.
          </div>
        )}

        <div className="form-grid">

          <div className="form-group">
            <label>Title</label>
            <input
              className="input-modern"
              value={form.title}
              disabled={!isOwner}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group full">
            <label>Description</label>
            <textarea
              className="input-modern textarea"
              value={form.description}
              disabled={!isOwner}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              className="input-modern"
              value={task.due_date}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              className="input-modern"
              value={form.priority}
              disabled={!isOwner}
              onChange={e => setForm({ ...form, priority: e.target.value })}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="input-modern"
              value={form.status}
              disabled={!isAssigned && !isOwner}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

        </div>

        <AttachmentsSection taskId={task.id} disabled={!isAssigned && !isOwner} />

        <CommentsSection taskId={task.id} disabled={!isAssigned && !isOwner} />

        <ActivityTimeline taskId={task.id} />

        <div className="modal-actions">

          {(isOwner || isAssigned) && (
            <button className="btn-primary" onClick={handleUpdate}>
              <FiSave />
              {loading ? "Saving..." : "Save"}
            </button>
          )}

          <button className="btn-secondary" onClick={close}>
            <FiX />
            Close
          </button>

        </div>

      </div>

    </div>
  );
}