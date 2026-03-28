// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export default function AddProjectMember({ projectId, refresh }) {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");

//   useEffect(() => {
//     api.get("projects/users/").then(res => setUsers(res.data));
//   }, []);

//   const addMember = async () => {
//     if (!selectedUser) return;

//     await api.post("projects/memberships/", {
//       user: selectedUser,
//       project: projectId,
//       role: "MEMBER"
//     });

//     toast.success("Member added");
//     refresh();
//   };

//   return (
//     <div style={{ marginTop: "10px" }}>
//       <select onChange={e => setSelectedUser(e.target.value)}>
//         <option value="">Select user</option>
//         {users.map(u => (
//           <option key={u.id} value={u.id}>{u.username}</option>
//         ))}
//       </select>
//       <button onClick={addMember}>Add Member</button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiUserPlus } from "react-icons/fi";
import "./styles/ProjectMembers.css";

export default function AddProjectMember({ projectId, refresh }) {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("projects/users/")
      .then(res => setUsers(res.data));
  }, []);

  const addMember = async () => {

    if (!selectedUser || loading) return;

    setLoading(true);

    try {

      await api.post("projects/memberships/", {
        user: selectedUser,
        project: projectId,
        role: "MEMBER"
      });

      toast.success("Member added");

      setSelectedUser("");
      refresh();

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="add-member-card">

      <div className="add-member-header">
        <FiUserPlus className="add-member-icon"/>
        <span>Add Member</span>
      </div>

      <div className="add-member-controls">

        <select
          className="input-modern"
          value={selectedUser}
          onChange={e => setSelectedUser(e.target.value)}
        >

          <option value="">Select user</option>

          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}

        </select>

        <button
          className="btn-primary"
          onClick={addMember}
          disabled={!selectedUser || loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

    </div>
  );
}