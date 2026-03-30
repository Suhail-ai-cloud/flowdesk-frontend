
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import StatCard from "../components/StatCard";
// import CircleProgress from "../components/Charts/CircleProgress";
// import "./styles/Dashboard.css";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

// useEffect(() => {
//   const fetchData = () => {
//     api.get("tasks/dashboard/")
//       .then(res => setData(res.data))
//       .catch(err => console.log(err));
//   };

//   fetchData();

//   // 🔥 Auto refresh every 10s
//   const interval = setInterval(fetchData, 10000);
//   return () => clearInterval(interval);
// }, []);


//   if (!data) return <p className="loading-text">Loading dashboard...</p>;

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">Dashboard Overview</h2>

//       {/* TOP STAT CARDS */}
//       <div className="stats-row">
//         <StatCard title="Total Tasks" value={data.total_tasks} />
//         <StatCard title="Completed Tasks" value={data.completed_tasks} />
//         <StatCard title="Overdue Tasks" value={data.overdue_tasks} />
//       </div>

//       {/* CIRCLE ANALYTICS */}
//       <div className="circle-grid">
//         <CircleProgress
//           label="Completion Rate"
//           value={Math.round(data.completion_percentage)}
//           color="#4caf50"
//         />
//         <CircleProgress
//           label="Pending Ratio"
//           value={Math.round((data.pending_tasks / data.total_tasks) * 100)}
//           color="#ffb300"
//         />
//         <CircleProgress
//           label="Overdue Ratio"
//           value={Math.round((data.overdue_tasks / data.total_tasks) * 100)}
//           color="#e53935"
//         />
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import CircleProgress from "../components/Charts/CircleProgress";
import { FiCheckSquare } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { FiClipboard } from "react-icons/fi";
import "./styles/Dashboard.css";
import { FiCheckCircle, FiAlertCircle, FiLayers } from "react-icons/fi";
export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      api.get("tasks/dashboard/")
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);

  }, []);

  if (!data) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-container">

<div className="dashboard-header">

  <div className="workspace-badge">
    🏢 {data.company_name || "Your Workspace"}
  </div>

  <h1>
    Welcome back, <span>{data.user_name || "User"}</span>
  </h1>

  <p>Here’s what’s happening with your tasks today</p>

</div>

      {/* STATISTICS */}
      <div className="stats-grid">

        <StatCard
          title="Total Tasks"
          value={data.total_tasks}
          icon={<FiLayers  />}
        />

        <StatCard
          title="Completed"
          value={data.completed_tasks}
          icon={<FiCheckCircle />}
        />

        <StatCard
          title="Overdue"
          value={data.overdue_tasks}
          icon={<FiAlertCircle  />}
        />
        {data.total_tasks === 0 && (
  <div className="empty-state">
    🚀 No tasks yet. Create your first project to get started.
  </div>
)}

      </div>

      {/* ANALYTICS SECTION */}
      <div className="analytics-section">

        <div className="section-header">
          <h3>Task Analytics</h3>
        </div>

        <div className="circle-grid">

          <CircleProgress
            label="Completion Rate"
            value={Math.round(data.completion_percentage)}
          />

          <CircleProgress
            label="Pending Ratio"
            value={
  data.total_tasks > 0
    ? Math.round((data.pending_tasks / data.total_tasks) * 100)
    : 0
}
          />

          <CircleProgress
            label="Overdue Ratio"
            value={
  data.total_tasks > 0
    ? Math.min(100, Math.round((data.overdue_tasks / data.total_tasks) * 100))
    : 0
}
          />

        </div>

      </div>

    </div>
  );
}