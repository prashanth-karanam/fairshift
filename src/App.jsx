import { Routes, Route, Navigate } from 'react-router-dom'
import RoleGateway from './pages/RoleGateway'
import WorkerLayout from './layouts/WorkerLayout'
import EmployerDashboard from './pages/employer/EmployerDashboard'
import AvailableJobs from './pages/worker/AvailableJobs'
import ShiftWageTracker from './pages/worker/ShiftWageTracker'
import WorkerProfile from './pages/worker/WorkerProfile'
import LocationCheckIn from './pages/worker/LocationCheckIn'
import SiteReviews from './pages/worker/SiteReviews'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleGateway />} />

      {/* Worker Mobile Routes */}
      <Route path="/worker" element={<WorkerLayout />}>
        <Route index element={<Navigate to="jobs" replace />} />
        <Route path="jobs" element={<AvailableJobs />} />
        <Route path="shifts" element={<ShiftWageTracker />} />
        <Route path="profile" element={<WorkerProfile />} />
        <Route path="location" element={<LocationCheckIn />} />
        <Route path="reviews" element={<SiteReviews />} />
      </Route>

      {/* Employer Desktop Route */}
      <Route path="/employer" element={<EmployerDashboard />} />
    </Routes>
  )
}

export default App
