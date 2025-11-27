import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Prevent registration if already logged in
  if (localStorage.getItem('user')) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await api.post('/customer/registration', { name, email, password, role });
      setMessage('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 1200);
      setName(''); setEmail(''); setPassword(''); setRole('user');
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom color="primary">Register</Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth required margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email" type="email" fullWidth required margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth required margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          <FormControl fullWidth sx={{ mt: 2 }} required>
            <InputLabel>Role</InputLabel>
            <Select value={role} label="Role" onChange={e => setRole(e.target.value)}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="management">Management</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
