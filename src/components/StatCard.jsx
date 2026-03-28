
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import "./styles/StatCard.css";

// export default function StatCard({ title, value, type }) {
//   const numberRef = useRef();

//   useEffect(() => {
//     gsap.fromTo(numberRef.current, { innerText: 0 }, {
//       innerText: value,
//       duration: 1.2,
//       snap: { innerText: 1 },
//       ease: "power1.out"
//     });
//   }, [value]);

//   return (
//     <div className={`stat-card ${type}`}>
//       <div>
//         <p>{title}</p>
//         <h2 ref={numberRef}>0</h2>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./styles/StatCard.css";

export default function StatCard({ title, value, icon }) {

  const numberRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      numberRef.current,
      { innerText: 0 },
      {
        innerText: value,
        duration: 1,
        snap: { innerText: 1 },
        ease: "power1.out"
      }
    );
  }, [value]);

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 ref={numberRef}>0</h2>
      </div>

    </div>
  );
}