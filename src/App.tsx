import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Repositories from './pages/Repositories'
import Issues from './pages/Issues'
import IssueSolver from './pages/IssueSolver'
import Validations from './pages/Validations'
import ValidationDetail from './pages/ValidationDetail'
import PullRequests from './pages/PullRequests'
import Contribute from './pages/Contribute'

function App() {
  const { checkAuth } = useAuthStore()
  
  // Check authentication when app loads
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/repositories" element={<ProtectedRoute><Layout><Repositories /></Layout></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute><Layout><Issues /></Layout></ProtectedRoute>} />
        <Route path="/issues/:issueId/solve" element={<ProtectedRoute><Layout><IssueSolver /></Layout></ProtectedRoute>} />
        <Route path="/validations" element={<ProtectedRoute><Layout><Validations /></Layout></ProtectedRoute>} />
        <Route path="/validations/:solutionId" element={<ProtectedRoute><Layout><ValidationDetail /></Layout></ProtectedRoute>} />
        <Route path="/pull-requests" element={<ProtectedRoute><Layout><PullRequests /></Layout></ProtectedRoute>} />
        <Route path="/contribute" element={<ProtectedRoute><Layout><Contribute /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

export default App
