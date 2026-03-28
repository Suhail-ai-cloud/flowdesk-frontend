// // import React, { useEffect, useState } from "react";
// // import api from "../api/axios";
// // import toast from "react-hot-toast";
// // import "./styles/CreateProjectModal.css";

// // export default function CreateProjectModal({ close, refresh }) {
// //   const [form, setForm] = useState({ name: "", description: "" });
// //   const [users, setUsers] = useState([]);
// //   const [selectedMembers, setSelectedMembers] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     api.get("projects/users/").then(res => setUsers(res.data));
// //   }, []);

// //   const toggleUser = (id) => {
// //     setSelectedMembers(prev =>
// //       prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
// //     );
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (loading) return;
// //     setLoading(true);

// //     try {
// //       if (!form.name.trim()) {
// //         toast.error("Project name required");
// //         return;
// //       }

// //       const res = await api.post("projects/", form);
// //       const projectId = res.data.id;

// //       await Promise.all(
// //         selectedMembers.map(userId =>
// //           api.post("projects/memberships/", {
// //             user: userId,
// //             project: projectId,
// //             role: "MEMBER"
// //           })
// //         )
// //       );

// //       toast.success("Project created");
// //       refresh();
// //       close();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="modal-backdrop">
// //       <div className="modal">
// //         <h3 className="modal-title">Create Project</h3>

// //         <input
// //           className="input-field"
// //           placeholder="Project Name"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />

// //         <textarea
// //           className="input-field"
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={(e) => setForm({ ...form, description: e.target.value })}
// //         />

// //         <h4 className="section-label">Add Members</h4>

// //         <div className="user-list">
// //           {users.map(u => (
// //             <label key={u.id} className="checkbox-row">
// //               <input type="checkbox" onChange={() => toggleUser(u.id)} />
// //               {u.username}
// //             </label>
// //           ))}
// //         </div>

// //         <div className="modal-actions">
// //           <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
// //             {loading ? "Creating..." : "Create"}
// //           </button>
// //           <button className="btn-secondary" onClick={close}>Cancel</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import "./styles/CreateProjectModal.css";

// export default function CreateProjectModal({ close, refresh }) {
//   const [form, setForm] = useState({ name: "", description: "" });
//   const [users, setUsers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     api.get("projects/users/").then(res => setUsers(res.data));
//   }, []);

//   const addMember = (id) => {
//     if (!selectedMembers.includes(id)) {
//       setSelectedMembers(prev => [...prev, id]);
//     }
//   };

//   const removeMember = (id) => {
//     setSelectedMembers(prev => prev.filter(u => u !== id));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);
//     try {
//       if (!form.name.trim()) {
//         toast.error("Project name required");
//         return;
//       }

//       const res = await api.post("projects/", form);
//       const projectId = res.data.id;

//       await Promise.all(
//         selectedMembers.map(userId =>
//           api.post("projects/memberships/", {
//             user: userId,
//             project: projectId,
//             role: "MEMBER"
//           })
//         )
//       );

//       toast.success("Project created");
//       refresh();
//       close();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h3 className="modal-title">Create Project</h3>

//         <input
//           className="input-field"
//           placeholder="Project Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <textarea
//           className="input-field"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <h4 className="section-label">Add Members</h4>

//         {/* Selected Tags */}
//         <div className="selected-members">
//           {selectedMembers.map(id => {
//             const user = users.find(u => u.id === id);
//             return (
//               <span key={id} className="member-tag">
//                 {user?.username}
//                 <button onClick={() => removeMember(id)}>×</button>
//               </span>
//             );
//           })}
//         </div>

//         {/* User Select Dropdown */}
//         <select
//           className="input-field"
//           onChange={(e) => addMember(e.target.value)}
//         >
//           <option value="">Select user</option>
//           {users.map(u => (
//             <option key={u.id} value={u.id}>
//               {u.username}
//             </option>
//           ))}
//         </select>

//         <div className="modal-actions">
//           <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
//             {loading ? "Creating..." : "Create"}
//           </button>
//           <button className="btn-secondary" onClick={close}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiUserPlus } from "react-icons/fi";
import "./styles/CreateProjectModal.css";

export default function CreateProjectModal({ close, refresh }) {

  const [form, setForm] = useState({ name: "", description: "" });
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("projects/users/").then(res => setUsers(res.data));
  }, []);

  const addMember = (id) => {
    if (!id) return;

    if (!selectedMembers.includes(id)) {
      setSelectedMembers(prev => [...prev, id]);
    }
  };

  const removeMember = (id) => {
    setSelectedMembers(prev => prev.filter(u => u !== id));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      if (!form.name.trim()) {
        toast.error("Project name required");
        return;
      }

      const res = await api.post("projects/", form);
      const projectId = res.data.id;

      await Promise.all(
        selectedMembers.map(userId =>
          api.post("projects/memberships/", {
            user: userId,
            project: projectId,
            role: "MEMBER"
          })
        )
      );

      toast.success("Project created");

      refresh();
      close();

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <h2>Create Project</h2>

        <input
          className="input"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          className="input textarea"
          placeholder="Project description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="members-section">

          <h4>
            <FiUserPlus />
            Add Members
          </h4>

          <div className="member-tags">

            {selectedMembers.map(id => {

              const user = users.find(u => u.id === id);

              return (
                <span key={id} className="tag">

                  {user?.username}

                  <button
                    onClick={() => removeMember(id)}
                  >
                    ×
                  </button>

                </span>
              );

            })}

          </div>

          <select
            className="input"
            onChange={(e) => addMember(e.target.value)}
          >
            <option value="">Select user</option>

            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}

          </select>

        </div>

        <div className="modal-actions">

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
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