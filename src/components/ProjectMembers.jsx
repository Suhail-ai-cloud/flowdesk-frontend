// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export default function ProjectMembers({ projectId }) {
//   const [members, setMembers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");

//   const fetchMembers = () => {
//     api.get(`projects/memberships/?project=${projectId}`)
//        .then(res => setMembers(res.data));
//   };

//   useEffect(() => {
//     fetchMembers();
//     api.get("projects/users/").then(res => setUsers(res.data));
//   }, [projectId]);

//   const addMember = async () => {
//     if (!selectedUser) return;

//     await api.post("projects/memberships/", {   // ✅ FIXED URL
//       project: projectId,
//       user: selectedUser,
//       role: "MEMBER"
//     });

//     toast.success("Member added");
//     setSelectedUser("");
//     fetchMembers();
//   };

//   const removeMember = async (id) => {
//     await api.delete(`projects/memberships/${id}/`);  // ✅ FIXED URL
//     toast.success("Member removed");
//     fetchMembers();
//   };

//   return (
//     <div className="members-box">
//       <h3>Project Members</h3>

//       {members.map(m => (
//         <div key={m.id} className="member-item">
//           <span>{m.username} ({m.role})</span>
//           {m.role !== "OWNER" && (
//            <button onClick={() => removeMember(m.id)}>Remove</button>

//           )}
//         </div>
//       ))}

//       {/* <h4>Add Member</h4>
//       <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
//         <option value="">Select User</option>
//         {users.map(u => (
//           <option key={u.id} value={u.id}>{u.username}</option>
//         ))}
//       </select>

//       <button onClick={addMember}>Add</button> */}
//     </div>
//   );
// }import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiUser, FiTrash2 } from "react-icons/fi";
import "./styles/ProjectMembers.css";

export default function ProjectMembers({ projectId }) {

  const [members, setMembers] = useState([]);

  const fetchMembers = () => {

    api.get(`projects/memberships/?project=${projectId}`)
       .then(res => setMembers(res.data));

  };

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const removeMember = async (id) => {

    await api.delete(`projects/memberships/${id}/`);

    toast.success("Member removed");

    fetchMembers();
  };

  return (

    <div className="members-card">

      <h3 className="section-title">
        Project Members
      </h3>

      {members.length === 0 && (
        <div className="empty-state">
          No members yet
        </div>
      )}

      <div className="members-list">

        {members.map(m => (

          <div key={m.id} className="member-row">

            <div className="member-left">

              <div className="avatar-circle">
                {m.username[0].toUpperCase()}
              </div>

              <div className="member-meta">

                <span className="member-name">
                  {m.username}
                </span>

                <span className={`role-badge ${m.role === "OWNER" ? "owner" : "member"}`}>
                  {m.role}
                </span>

              </div>

            </div>

            {m.role !== "OWNER" && (

              <button
                className="btn-icon-danger"
                onClick={() => removeMember(m.id)}
              >
                <FiTrash2 />
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}