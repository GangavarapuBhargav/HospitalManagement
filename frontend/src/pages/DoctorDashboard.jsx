import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import api from '../services/api';

const DoctorDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await api.get(`/api/appointments/doctor/${user.id}`);
      setAppointments(res.data);
    } catch {
      setError('Could not fetch appointments');
    }
  };
  useEffect(() => { fetchAppointments(); }, [user]);

  return (
    <Box py={8}>
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>Doctor Dashboard</Typography>
        <Typography variant="h6" gutterBottom>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>Your Appointments</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Patient Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((a, i) => (
              <TableRow key={i}>
                <TableCell>{a.date}</TableCell>
                <TableCell>{a.description}</TableCell>
                <TableCell>{a.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default DoctorDashboard;
