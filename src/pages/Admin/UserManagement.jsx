import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX
} from "react-icons/fi";

import "./UserManagement.css";

export default function UserManagement() {

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const fetchUsers = async () => {
    const res = await api.get("auth/my-users/");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* CREATE USER */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("auth/create-user/", form);

      toast.success("User created");

      setForm({
        username: "",
        email: "",
        password: ""
      });

      setShowCreateForm(false);

      fetchUsers();

    } catch {

      toast.error("Failed to create user");

    }

  };

  /* DELETE USER */

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await api.delete(`auth/delete-user/${id}/`);

      toast.success("User deleted");

      fetchUsers();

    } catch {

      toast.error("Failed to delete user");

    }

  };

  /* EDIT USER */

  const updateUser = async () => {

    try {

      await api.patch(`auth/update-user/${editingUser.id}/`, editingUser);

      toast.success("User updated");

      setEditingUser(null);

      fetchUsers();

    } catch {

      toast.error("Update failed");

    }

  };

  return (

    <div className="user-page">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>User Management</h1>

          <p>
            Manage members inside your workspace
          </p>

        </div>

        {!showCreateForm && (

          <button
            className="btn-primary add-user-btn"
            onClick={() => setShowCreateForm(true)}
          >
            <FiPlus/>
            Add User
          </button>

        )}

      </div>

      {/* CREATE USER FORM */}

      {showCreateForm && (

        <div className="card">

          <div className="form-header">

            <h3>Create User</h3>

            <button
              className="icon-btn"
              onClick={() => setShowCreateForm(false)}
            >
              <FiX/>
            </button>

          </div>

          <form className="create-user-form" onSubmit={handleSubmit}>

            <div className="input-group">

              <FiUser className="input-icon"/>

              <input
                placeholder="Username"
                value={form.username}
                required
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />

            </div>

            <div className="input-group">

              <FiMail className="input-icon"/>

              <input
                placeholder="Email"
                value={form.email}
                required
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

            </div>

            <div className="input-group">

              <FiLock className="input-icon"/>

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                required
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

            </div>

            <button className="btn-primary">
              Create User
            </button>

          </form>

        </div>

      )}

      {/* USERS LIST */}

      <div className="card">

        <h3>Your Users</h3>

        <div className="users-grid">

          {users.map((u) => (

            <div key={u.id} className="user-card">

              <div className="avatar">
                {u.username[0]}
              </div>

              <div className="user-info">

                <strong>{u.username}</strong>

                <p>{u.email}</p>

              </div>

              <div className="user-actions">

                <button
                  className="icon-btn edit"
                  onClick={() => setEditingUser(u)}
                >
                  <FiEdit2/>
                </button>

                <button
                  className="icon-btn delete"
                  onClick={() => deleteUser(u.id)}
                >
                  <FiTrash2/>
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* EDIT MODAL */}

      {editingUser && (

        <div className="modal-backdrop">

          <div className="modal-card">

            <h3>Edit User</h3>

            <input
              value={editingUser.username}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  username: e.target.value
                })
              }
            />

            <input
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value
                })
              }
            />

            <div className="modal-actions">

              <button
                className="btn-primary"
                onClick={updateUser}
              >
                Save
              </button>

              <button
                className="btn-secondary"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}