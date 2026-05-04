import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Companies from './pages/Companies';
import CompanyDetail from './pages/CompanyDetail';

import Profile from './pages/student/Profile';
import MyApplications from './pages/student/MyApplications';

import Dashboard from './pages/recruiter/Dashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import ManageCompany from './pages/recruiter/ManageCompany';
import Applicants from './pages/recruiter/Applicants';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetail />} />

        {/* Student Protected */}
        <Route element={<ProtectedRoute role="student" />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        {/* Recruiter Protected */}
        <Route element={<ProtectedRoute role="recruiter" />}>
          <Route path="/recruiter/dashboard" element={<Dashboard />} />
          <Route path="/recruiter/post-job" element={<PostJob />} />
          <Route path="/recruiter/jobs" element={<ManageJobs />} />
          <Route path="/recruiter/company" element={<ManageCompany />} />
          <Route path="/recruiter/jobs/:id/applicants" element={<Applicants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}