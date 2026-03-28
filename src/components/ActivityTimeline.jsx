// import React, { useEffect, useRef, useState } from "react";
// import api from "../api/axios";
// import "./ActivityTimeline.css";

// export default function ActivityTimeline({ taskId }) {
//   const [logs, setLogs] = useState([]);
//   const bottomRef = useRef(null);

//   const fetchLogs = () => {
//     api.get(`activity/logs/?task=${taskId}`).then(res => setLogs(res.data));
//   };

//   useEffect(() => {
//     fetchLogs();

//     // 🔥 Live update every 5s
//     const interval = setInterval(fetchLogs, 5000);
//     return () => clearInterval(interval);
//   }, [taskId]);

//   // 🔥 Auto-scroll to newest
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [logs]);

//   const getColor = (action) => {
//     if (action.includes("created")) return "blue";
//     if (action.includes("completed")) return "green";
//     if (action.includes("updated")) return "orange";
//     if (action.includes("Comment")) return "purple";
//     return "gray";
//   };

//   return (
//     <div className="timeline">
//       <h4>Activity</h4>
//       {logs.map(log => (
//         <div key={log.id} className={`timeline-item ${getColor(log.action)}`}>
//           <div className="timeline-dot" />
//           <div className="timeline-content">
//             <b>{log.username}</b> {log.action}
//             <span>{new Date(log.timestamp).toLocaleString()}</span>
//           </div>
//         </div>
//       ))}
//       <div ref={bottomRef} />
//     </div>
//   );
// }import React, { useEffect, useRef, useState } from "react";
import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import "./styles/ActivityTimeline.css";

export default function ActivityTimeline({ taskId }) {

  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  const fetchLogs = () => {
    api.get(`activity/logs/?task=${taskId}`)
      .then(res => setLogs(res.data));
  };

  useEffect(() => {

    fetchLogs();

    const interval = setInterval(fetchLogs, 5000);

    return () => clearInterval(interval);

  }, [taskId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (

    <div className="timeline-section">

      <h3 className="section-title">
        Activity
      </h3>

      <div className="timeline">

        {logs.map(log => (

          <div key={log.id} className="timeline-row">

            <div className="timeline-dot"/>

            <div className="timeline-content">
              <b>{log.username}</b> {log.action}

              <span className="timeline-time">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>

          </div>

        ))}

        <div ref={bottomRef}/>

      </div>

    </div>

  );
}