// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Dashboard from "./pages/Dashboard";
// import ProjectList from "./pages/Projects/ProjectList";
// import ProjectDetail from "./pages/Projects/ProjectDetail";
// import AppLayout from "./components/AppLayout";
// import Navbar from "./components/Navbar"; 
// import UserManagement from "./pages/Admin/UserManagement";

// import Landing from "./pages/Landing";

// export default function App() {
//   return (
//     <AuthProvider>
//       <Toaster position="top-right" />

//       <BrowserRouter>
//         <Routes>

//           {/* Public Routes */}
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected Routes with Navbar */}
//           <Route path="/" element={
//             <ProtectedRoute>
//               <AppLayout>
//                 <Dashboard />
//               </AppLayout>
//             </ProtectedRoute>
//           } />

//           <Route path="/projects" element={
//             <ProtectedRoute>
//               <AppLayout>
//                 <ProjectList />
//               </AppLayout>
//             </ProtectedRoute>
//           } />

//           <Route path="/projects/:id" element={
//             <ProtectedRoute>
//               <AppLayout>
//                 <ProjectDetail />
//               </AppLayout>
//             </ProtectedRoute>
//           } />
//           <Route path="/users" element={<UserManagement />} />

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Landing from "./pages/Landing";
import GlobalLoader from "./components/GlobalLoader";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/Projects/ProjectList";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import UserManagement from "./pages/Admin/UserManagement";

import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
      <GlobalLoader />
      <Toaster position="top-right" />

      <BrowserRouter>
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/projects" element={
            <ProtectedRoute>
              <AppLayout>
                <ProjectList />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/projects/:id" element={
            <ProtectedRoute>
              <AppLayout>
                <ProjectDetail />
              </AppLayout>
            </ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute>
              <AppLayout>
                <UserManagement />
              </AppLayout>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}