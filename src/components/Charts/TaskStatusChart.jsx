// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// export default function TaskStatusChart({ statusCounts }) {
//   if (!statusCounts) return <p>Loading chart...</p>;

//   const data = {
//     labels: ["Completed", "Pending", "Overdue"],
//     datasets: [
//       {
//         label: "Tasks",
//         data: [
//           statusCounts.Completed,
//           statusCounts.Pending,
//           statusCounts.Overdue
//         ],
//         backgroundColor: ["#28a745", "#ffc107", "#dc3545"]
//       }
//     ]
//   };

//   return <Bar data={data} />;
// }
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskStatusChart({ statusCounts }) {
  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [{
      data: [
        statusCounts.Completed,
        statusCounts.Pending,
        statusCounts.Overdue
      ],
      backgroundColor: ["#4caf50", "#ffb300", "#e53935"],
      borderWidth: 0
    }]
  };

  return <Doughnut data={data} />;
}
