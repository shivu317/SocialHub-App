// App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './components/Auth/AuthContext'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import BasicLayout from './components/SideBar'
import MyLikes from './pages/MyLikes'
import MyBookmarks from './pages/MyBookmarks'
import MyPosts from './pages/MyPosts'
import Dashboard from './pages/Dashboard'
import MyProTable from './components/MyProTable'
import ExpandableProTable from './components/ExpandableProTable'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<DashboardWrapper />} />
          <Route path="/my-table" element={<MyProTable />} />
          <Route path="/expandable-pro-table" element={<ExpandableProTable />} />
          <Route path="/my-likes" element={<MyLikes />} />
          <Route path="/my-bookmarks" element={<MyBookmarks />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

const AppRoutes: React.FC = () => {
  const auth = useAuth()

  return auth.isAuthenticated ? (
    <BasicLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/my-likes" element={<MyLikes />} />
        <Route path="/my-bookmarks" element={<MyBookmarks />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Routes>
    </BasicLayout>
  ) : (
    <Navigate to="/login" replace={true} />
  )
}

const DashboardWrapper: React.FC = () => {
  const auth = useAuth()

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }

  return <Dashboard />
}

export default App
