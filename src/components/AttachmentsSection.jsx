import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { FiUpload, FiTrash2, FiFile } from "react-icons/fi";
import "./styles/Attachments.css";

export default function AttachmentsSection({ taskId }) {

  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const res = await api.get(`tasks/attachments/?task=${taskId}`);
    setFiles(res.data);
  };

  useEffect(() => { fetchFiles(); }, [taskId]);

  const handleUpload = async (e) => {

    const uploadedFiles = e.target.files;

    for (let file of uploadedFiles) {

      const formData = new FormData();
      formData.append("task", taskId);
      formData.append("file", file);

      await api.post(
        "tasks/attachments/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    toast.success("Files uploaded");
    fetchFiles();
  };

  const deleteFile = async (id) => {
    await api.delete(`tasks/attachments/${id}/`);
    toast.success("File deleted");
    fetchFiles();
  };

  return (
    <div className="card-section">

      <h3 className="section-title">Attachments</h3>

      <label className="upload-box">
        <FiUpload />
        <span>Upload files</span>

        <input
          type="file"
          multiple
          onChange={handleUpload}
          hidden
        />
      </label>

      <div className="attachments-list">

        {files.map(f => (

          <div key={f.id} className="file-item">

            <FiFile />

            <a
              href={f.file}
              target="_blank"
              rel="noreferrer"
            >
              {f.file.split("/").pop()}
            </a>

            <button
              className="btn-icon-danger"
              onClick={() => deleteFile(f.id)}
            >
              <FiTrash2/>
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}