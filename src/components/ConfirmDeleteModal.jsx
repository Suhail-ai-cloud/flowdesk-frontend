// import React from "react";

// export default function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h3>Confirm Deletion</h3>
//         <p>{message}</p>

//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <button onClick={onCancel}>Cancel</button>
//           <button
//             onClick={onConfirm}
//             style={{ background: "red", color: "white" }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./styles/SystemModals.css";

export default function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal modal-small">
        <h3 className="modal-title danger">Confirm Deletion</h3>
        <p className="modal-text">{message}</p>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
