import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import ManagementDashboard from './pages/ManagementDashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#009688' },
    background: { default: '#f8fafc' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  function PrivateRoute({ children }) {
    return user ? children : <Navigate to="/login" replace />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/user" element={<PrivateRoute><UserDashboard user={user} /></PrivateRoute>} />
          <Route path="/dashboard/doctor" element={<PrivateRoute><DoctorDashboard user={user} /></PrivateRoute>} />
          <Route path="/dashboard/management" element={<PrivateRoute><ManagementDashboard user={user} /></PrivateRoute>} />
          {/* legacy fallback for /dashboard */}
          <Route path="/dashboard" element={<PrivateRoute><ManagementDashboard user={user} /></PrivateRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
