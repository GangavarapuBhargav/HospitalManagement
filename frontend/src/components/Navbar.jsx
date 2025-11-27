import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const localUser = localStorage.getItem('user');
  const user = localUser ? JSON.parse(localUser) : null;
  const role = user?.role;
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };
  return (
    <AppBar position="fixed" color="primary" sx={{ width: '100vw', left: 0 }} elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64, px: 6 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem' }}>
          SpringBootFinalProject
        </Typography>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {user && (
            <>
              {/* Appointments link routes to the correct dashboard by role */}
              {role === 'user' && <Button color="inherit" component={Link} to="/dashboard/user">Appointments</Button>}
              {role === 'doctor' && <Button color="inherit" component={Link} to="/dashboard/doctor">Appointments</Button>}
              {/* Profile page for future expansion */}
              <Button color="inherit" component={Link} to="#">Profile</Button>
              {/* Management/summary link for admin/management */}
              {(role === 'management' || role === 'admin') && (
                <Button color="inherit" component={Link} to="/dashboard/management">Management</Button>
              )}
              {/* Display user greeting/name */}
              <Typography sx={{ color: 'white', ml: 2, mr: 2 }}>
                Welcome, {user.name || user.email || 'User'}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
          {!user && <Button color="inherit" component={Link} to="/login">Login</Button>}
          {!user && <Button color="inherit" component={Link} to="/register">Register</Button>}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
