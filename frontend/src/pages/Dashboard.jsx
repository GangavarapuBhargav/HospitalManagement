import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Paper, Button, TextField, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert
} from '@mui/material';
import api from '../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const emptyForm = { name: '', email: '', password: '' };

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch {
      setError('Failed to load users');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openDialog = (user) => {
    if (user) {
      setEditing(user.id);
      setForm(user);
    } else {
      setEditing(null);
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false); setEditing(null); setForm(emptyForm); setMessage(''); setError('');
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      setMessage('User deleted.');
      fetchUsers();
    } catch {
      setError('Delete failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setMessage(''); setError(''); setLoading(true);
    try {
      if (editing) {
        await api.put(`/api/users/${editing}`, form);
        setMessage('User updated!');
      } else {
        await api.post('/api/users', form);
        setMessage('User created!');
      }
      closeDialog(); fetchUsers();
    } catch {
      setError('Save failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={6}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>User Management</Typography>
          <Button variant="contained" color="success" sx={{ mb: 2 }} onClick={() => openDialog()}>+ Add User</Button>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.password}</TableCell>
                  <TableCell align="right">
                    <IconButton color="info" onClick={() => openDialog(u)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(u.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{editing ? 'Edit User' : 'Add User'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Name" name="name" value={form.name || ''} onChange={handleChange} required />
            <TextField label="Email" name="email" value={form.email || ''} onChange={handleChange} type="email" required />
            <TextField label="Password" name="password" value={form.password || ''} onChange={handleChange} type="text" required />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
