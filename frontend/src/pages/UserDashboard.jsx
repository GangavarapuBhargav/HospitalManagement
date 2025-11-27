import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Button, TextField, Table, TableHead, TableRow, TableCell, TableBody, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../services/api';

const UserDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all doctors from backend on mount
    async function fetchDoctors() {
      try {
        const res = await api.get('/api/doctors');
        setDoctors(res.data);
        if (res.data.length) setDoctorId(res.data[0].id);
      } catch {
        setDoctors([]);
      }
    }
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/appointments');
      setAppointments(res.data.filter(a => a.email === user.email || a.userId === user.id));
    } catch {
      setError('Could not fetch appointments');
    }
  };
  useEffect(() => { fetchAppointments(); }, [user]);

  const handleBook = async e => {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true);
    try {
      const doctorName = doctors.find(doc => doc.id === doctorId)?.name || '';
      await api.post('/api/appointments/book', {
        userId: user.id,
        email: user.email,
        date,
        description: desc,
        doctorId,
        doctorName
      });
      setMessage('Appointment booked!');
      setDate(''); setDesc(''); setDoctorId(doctors.length ? doctors[0].id : '');
      fetchAppointments();
    } catch {
      setError('Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={8}>
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>User Dashboard</Typography>
        <Typography variant="h6" gutterBottom>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Box component="form" sx={{ mt: 4, mb: 2, display: 'flex', gap: 2, justifyContent: 'center' }} onSubmit={handleBook}>
          <TextField type="date" value={date} onChange={e => setDate(e.target.value)} required sx={{ width: 160 }} />
          <TextField label="Description" value={desc} onChange={e => setDesc(e.target.value)} required sx={{ width: 200 }} />
          <FormControl sx={{ minWidth: 160 }} required>
            <InputLabel>Doctor</InputLabel>
            <Select value={doctorId} label="Doctor" onChange={e => setDoctorId(e.target.value)} required>
              {doctors.map(doc => (
                <MenuItem key={doc.id} value={doc.id}>{doc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" disabled={loading || !doctorId}>{loading ? 'Booking...' : 'Book'}</Button>
        </Box>

        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>Your Appointments</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Doctor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.date}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell>{a.doctorName || a.doctorId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default UserDashboard;
