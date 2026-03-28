import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./styles/NotificationBell.css";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchData = () => {
    api.get("activity/notifications/").then(res => setNotifications(res.data));
    api.get("activity/notifications/unread_count/")
       .then(res => setCount(res.data.unread_notifications));
  };

  useEffect(fetchData, []);

  const markRead = async (id) => {
    await api.patch(`activity/notifications/${id}/mark_read/`);
    fetchData();
  };

  return (
    <div className="notify-container">
      <button className="bell-btn" onClick={() => setOpen(!open)}>
        🔔
        {count > 0 && <span className="badge">{count}</span>}
      </button>

      {open && (
        <div className="notify-panel">
          <div className="notify-header">Notifications</div>

          <div className="notify-body">
            {notifications.length === 0 && <div className="empty">No notifications</div>}

            {notifications.map(n => (
              <div
                key={n.id}
                className={`notify-item ${n.is_read ? "read" : "unread"}`}
                onClick={() => markRead(n.id)}
              >
                <div className="notify-dot" />
                <div className="notify-text">
                  {n.message}
                  <span>{new Date(n.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
