// import React, { useEffect, useState, useRef } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement } from "chart.js";

// ChartJS.register(ArcElement);

// export default function CircleProgress({ value, label }) {
//   const chartRef = useRef();
//   const [gradient, setGradient] = useState("#3b82f6");
//   const [progress, setProgress] = useState(0);

//   // Smooth number animation
//   useEffect(() => {
//     let start = 0;
//     const interval = setInterval(() => {
//       start += 1;
//       if (start >= value) clearInterval(interval);
//       setProgress(start);
//     }, 10);
//     return () => clearInterval(interval);
//   }, [value]);

//   // Create REAL gradient after mount
//   useEffect(() => {
//     if (!chartRef.current) return;

//     const chart = chartRef.current;
//     const ctx = chart.ctx;

//     const grad = ctx.createLinearGradient(0, 0, 0, 200);
//     grad.addColorStop(0, "#3b82f6");
//     grad.addColorStop(1, "#10b981");

//     setGradient(grad);
//   }, []);

//   const data = {
//     labels: ["Progress", "Remaining"],
//     datasets: [
//       {
//         data: [progress, 100 - progress],
//         backgroundColor: [gradient, "#1e293b"],
//         borderWidth: 0,
//         cutout: "78%",
//       },
//     ],
//   };

//   const options = {
//     plugins: { tooltip: { enabled: false } },
//     animation: { animateRotate: true },
//   };

//   return (
//     <div className="circle-card">
//       <div className="circle-wrapper">
//         <Doughnut ref={chartRef} data={data} options={options} />
//         <div className="circle-text">{progress}%</div>
//       </div>
//       <p>{label}</p>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import "./CircleProgress.css";

ChartJS.register(ArcElement);

export default function CircleProgress({ value, label }) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    let start = 0;

    const interval = setInterval(() => {
      start += 1;

      if (start >= value) clearInterval(interval);

      setProgress(start);

    }, 10);

    return () => clearInterval(interval);

  }, [value]);

  const data = {
    labels: ["Progress", "Remaining"],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ["#2563eb", "#e5e7eb"],
        borderWidth: 0,
        cutout: "78%",
      },
    ],
  };

  const options = {
    plugins: { tooltip: { enabled: false } },
    animation: { animateRotate: true },
  };

  return (
    <div className="circle-card">

      <div className="circle-wrapper">

        <Doughnut data={data} options={options} />

        <div className="circle-text">
          {progress}%
        </div>

      </div>

      <p className="circle-label">{label}</p>

    </div>
  );
}