import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import api from '../services/api';
import { Box, Paper, Typography, Grid } from '@mui/material';

const ManagementDashboard = () => {
  const [counts, setCounts] = useState({ users: 0, doctors: 0, appointments: 0 });
  useEffect(() => {
    async function fetchCounts() {
      try {
        const [users, doctors, appointments] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/doctors'),
          api.get('/api/appointments'),
        ]);
        setCounts({
          users: users.data.length,
          doctors: doctors.data.length,
          appointments: appointments.data.length,
        });
      } catch(e) {
        // ignore for now
      }
    }
    fetchCounts();
  }, []);
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 4 }} justifyContent="center">
        <Grid item>
          <Paper elevation={3} sx={{ p: 3, minWidth: 150, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h6">Users</Typography>
            <Typography variant="h4">{counts.users}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} sx={{ p: 3, minWidth: 150, textAlign: 'center', bgcolor: '#e8f5e9' }}>
            <Typography variant="h6">Doctors</Typography>
            <Typography variant="h4">{counts.doctors}</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} sx={{ p: 3, minWidth: 170, textAlign: 'center', bgcolor: '#fff3e0' }}>
            <Typography variant="h6">Appointments</Typography>
            <Typography variant="h4">{counts.appointments}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Dashboard />
    </Box>
  );
};

export default ManagementDashboard;
