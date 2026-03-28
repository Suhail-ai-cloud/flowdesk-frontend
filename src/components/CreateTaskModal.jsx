// import React, { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";


// export default function CreateTaskModal({ projectId, members, close, refresh }) {

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     due_date: "",
//     priority: "MEDIUM",
//     status: "PENDING",
//     project: projectId,
//     assigned_to: ""
//   });

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   await api.post("tasks/", form);
//   toast.success("Task created");
//   refresh();
//   close();
// };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h3>Create Task</h3>
//         <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
//         <textarea placeholder="Description" onChange={e => setForm({...form, description:e.target.value})}/>
//         <input type="date" onChange={e => setForm({...form, due_date:e.target.value})}/>
        
//         <select onChange={e => setForm({...form, priority:e.target.value})}>
//           <option value="LOW">Low</option>
//           <option value="MEDIUM">Medium</option>
//           <option value="HIGH">High</option>
//         </select>
//         <select
//   value={form.assigned_to}
//   onChange={e => setForm({...form, assigned_to: e.target.value})}
// >
//   <option value="">Unassigned</option>
//   {members.map(m => (
//     <option key={m.id} value={m.id}>{m.name}</option>
//   ))}
// </select>


//         <button onClick={handleSubmit}>Create</button>
//         <button onClick={close}>Cancel</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Select from "react-select";
import { FiClipboard, FiCalendar, FiUsers } from "react-icons/fi";
import "./styles/TaskModal.css";

export default function CreateTaskModal({ projectId, members, close, refresh }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "MEDIUM",
    status: "PENDING",
    project: projectId,
    assigned_to: []
  });

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await api.post("tasks/", form);
      toast.success("Task created");
      refresh();
      close();
    } catch {
      toast.error("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: 8,
      borderColor: "#e5e7eb",
      boxShadow: "none",
      padding: "2px",
      "&:hover": { borderColor: "#2563eb" }
    })
  };

  return (
    <div className="modal-backdrop">

      <div className="modal-card">

        <div className="modal-header">
          <FiClipboard className="modal-icon" />
          <h2>Create Task</h2>
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>Title</label>
            <input
              className="input-modern"
              placeholder="Task title"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="input-modern textarea"
              placeholder="Task description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>
              <FiCalendar /> Due Date
            </label>

            <input
              type="date"
              className="input-modern"
              onChange={(e) =>
                setForm({ ...form, due_date: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              className="input-modern"
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="form-group full">
            <label>
              <FiUsers /> Assign Members
            </label>

            <Select
              isMulti
              styles={selectStyles}
              options={members.map((m) => ({
                value: m.id,
                label: m.name
              }))}
              onChange={(selected) =>
                setForm({
                  ...form,
                  assigned_to: selected.map((s) => s.value)
                })
              }
              placeholder="Select members..."
            />
          </div>

        </div>

        <div className="modal-actions">

          <button
            className="btn-primary"
            onClick={handleSubmit}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

          <button
            className="btn-secondary"
            onClick={close}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}