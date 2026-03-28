// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// export default function CommentsSection({ taskId }) {
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState("");

//   const fetchComments = () => {
//     api.get(`tasks/comments/?task=${taskId}`)
//        .then(res => setComments(res.data));
//   };

//   useEffect(() => { fetchComments(); }, [taskId]);

//   const addComment = async () => {
//     if (!text.trim()) return;
//     await api.post("tasks/comments/", { task: taskId, text });
//     toast.success("Comment added");
//     setText("");
//     fetchComments();
//   };

//   const deleteComment = async (id) => {
//     await api.delete(`tasks/comments/${id}/`);
//     toast.success("Comment deleted");
//     fetchComments();
//   };

//   return (
//     <div className="comments-box">
//       <h4>Comments</h4>

//       {comments.map(c => (
//         <div key={c.id} className="comment-item">
//           <strong>{c.user_name}</strong>
//           <p>{c.text}</p>
//           <small>{new Date(c.created_at).toLocaleString()}</small>
//           <button onClick={() => deleteComment(c.id)}>Delete</button>
//         </div>
//       ))}

//       <textarea
//         placeholder="Write a comment..."
//         value={text}
//         onChange={e => setText(e.target.value)}
//       />
//       <button onClick={addComment}>Post</button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiSend, FiTrash2 } from "react-icons/fi";
import "./styles/Comments.css";

export default function CommentsSection({ taskId }) {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = () => {
    api.get(`tasks/comments/?task=${taskId}`)
      .then(res => setComments(res.data));
  };

  useEffect(() => { fetchComments(); }, [taskId]);

  const addComment = async () => {
    if (!text.trim()) return;

    await api.post("tasks/comments/", { task: taskId, text });

    toast.success("Comment added");

    setText("");
    fetchComments();
  };

  const deleteComment = async (id) => {
    await api.delete(`tasks/comments/${id}/`);
    toast.success("Comment deleted");
    fetchComments();
  };

  return (
    <div className="card-section">

      <h3 className="section-title">Comments</h3>

      <div className="comments-list">

        {comments.map(c => (

          <div key={c.id} className="comment-card">

            <div className="comment-header">
              <div className="avatar">
                {c.user_name[0]}
              </div>

              <div className="comment-meta">
                <strong>{c.user_name}</strong>
                <span>{new Date(c.created_at).toLocaleString()}</span>
              </div>
            </div>

            <p>{c.text}</p>

            <button
              className="btn-icon-danger"
              onClick={() => deleteComment(c.id)}
            >
              <FiTrash2/>
            </button>

          </div>

        ))}

      </div>

      <div className="comment-input">

        <textarea
          className="input-modern"
          placeholder="Write a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button className="btn-primary" onClick={addComment}>
          <FiSend/>
          Post
        </button>

      </div>

    </div>
  );
}