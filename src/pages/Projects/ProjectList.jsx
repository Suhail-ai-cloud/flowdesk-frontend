// // import React, { useEffect, useState } from "react";
// // import api from "../../api/axios";
// // import ProjectCard from "../../components/ProjectCard";
// // import CreateProjectModal from "../../components/CreateProjectModal";
// // import "../styles/Projects.css";

// // export default function ProjectList() {
// //     const [projects, setProjects] = useState([]);
// //     const [showModal, setShowModal] = useState(false);
// //     const [loading, setLoading] = useState(true);

// //     const fetchProjects = () => {
// //         setLoading(true);
// //         api.get("projects/")
// //             .then(res => setProjects(res.data))
// //             .finally(() => setLoading(false));
// //     };

// //     useEffect(() => { fetchProjects(); }, []);

// //     return (
// //         <div className="projects-page">
// //             <div className="projects-header">
// //                 <h2>Projects</h2>
// //                 <button onClick={() => setShowModal(true)}>+ New Project</button>
// //             </div>

// //             {loading && <p>Loading projects...</p>}

// //             {!loading && projects.length === 0 && (
// //                 <p>No projects yet. Create your first project 🚀</p>
// //             )}

// //             <div className="projects-grid">
// //                 {projects.map(p => (
// //                     <ProjectCard key={p.id} project={p} refresh={fetchProjects} />
// //                 ))}
// //             </div>

// //             {showModal && (
// //                 <CreateProjectModal close={() => setShowModal(false)} refresh={fetchProjects} />
// //             )}
// //         </div>
// //     );
// // }

// import React, { useEffect, useState, useCallback } from "react";
// import api from "../../api/axios";
// import ProjectCard from "../../components/ProjectCard";
// import CreateProjectModal from "../../components/CreateProjectModal";
// import "./styles/ProjectList.css";

// export default function ProjectList() {
//     const [projects, setProjects] = useState([]);
//     const [isCreateOpen, setIsCreateOpen] = useState(false);
//     const [loading, setLoading] = useState(true);

//     const fetchProjects = useCallback(() => {
//         setLoading(true);
//         api.get("projects/")
//             .then(res => setProjects(res.data))
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => {
//         fetchProjects();
//     }, [fetchProjects]);

//     return (
//         <div className="page-container projects-page">
//             <div className="page-header">
//                 <h2 className="page-title">Projects</h2>
//                 <button
//                     className="btn-primary"
//                     onClick={() => setIsCreateOpen(true)}
//                 >
//                     + New Project
//                 </button>
//             </div>

//             {loading && <p className="loader-text">Loading projects...</p>}

//             {!loading && projects.length === 0 && (
//                 <div className="empty-state">
//                     No projects yet. Create your first project 🚀
//                 </div>
//             )}

//             <div className="grid-layout projects-grid">
//                 {projects.map(project => (
//                     <ProjectCard
//                         key={project.id}
//                         project={project}
//                         refresh={fetchProjects}
//                     />
//                 ))}
//             </div>

//             {isCreateOpen && (
//                 <CreateProjectModal
//                     close={() => setIsCreateOpen(false)}
//                     refresh={fetchProjects}
//                 />
//             )}
//         </div>
//     );
// }
import React, { useEffect, useState, useCallback } from "react";
import api from "../../api/axios";
import ProjectCard from "../../components/ProjectCard";
import CreateProjectModal from "../../components/CreateProjectModal";
import { FiPlus } from "react-icons/fi";
import "./styles/ProjectList.css";

export default function ProjectList() {

    const [projects, setProjects] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(() => {
        setLoading(true);
        api.get("projects/")
            .then(res => setProjects(res.data))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="projects-page">

            <div className="page-header">

                <div>
                    <h1 className="page-title">Projects</h1>
                    <p className="page-subtitle">
                        Manage and track your project progress
                    </p>
                </div>

                <button
                    className="btn-primary"
                    onClick={() => setIsCreateOpen(true)}
                >
                    <FiPlus />
                    New Project
                </button>

            </div>

            {loading && (
                <div className="loader">Loading projects...</div>
            )}

            {!loading && projects.length === 0 && (
                <div className="empty-state">
                    <h3>No projects yet</h3>
                    <p>Create your first project to start managing tasks.</p>
                </div>
            )}

            <div className="projects-grid">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        refresh={fetchProjects}
                    />
                ))}
            </div>

            {isCreateOpen && (
                <CreateProjectModal
                    close={() => setIsCreateOpen(false)}
                    refresh={fetchProjects}
                />
            )}

        </div>
    );
}