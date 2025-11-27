import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Card, CardContent } from '@mui/material';
import api from '../services/api';

const testimonials = [
  {
    name: 'Dr. Sarah Lee',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'This platform makes patient appointments and profile management seamless for doctors and staff. Highly recommended!'
  },
  {
    name: 'John Patient',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Registering and booking appointments is simple and safe. The dashboard is intuitive and easy to use.'
  },
  {
    name: 'Dr. Amit Patel',
    photo: 'https://randomuser.me/api/portraits/men/40.jpg',
    text: 'A modern solution for busy clinics. I love the analytics and notification features.'
  },
];

const Home = () => {
  const [health, setHealth] = useState('');

  useEffect(() => {
    api.get('/')
      .then(() => setHealth('Backend is online!'))
      .catch(() => setHealth('Backend NOT reachable.'));
  }, []);

  return (
    <Box sx={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ py: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Box sx={{ maxWidth: 500 }}>
          <Typography variant="h2" component="h1" gutterBottom color="primary.main" fontWeight="700">
            Welcome to SpringBootFinalProject
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage appointments and profiles efficiently and securely. Login or register to get started.
          </Typography>
          {health && <Typography sx={{ mt: 3 }} color={health.includes('online') ? 'success.main' : 'error.main'}>{health}</Typography>}
        </Box>
        <Box sx={{ maxWidth: 400 }}>
          <img src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80" alt="Doctors meeting" width="100%" style={{ borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }} />
        </Box>
      </Box>

      {/* Testimonials - horizontal row, full width, no grid/container, not responsive */}
      <Box sx={{ mt: 8, width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">What Our Users Say</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 6, px: 8 }}>
          {testimonials.map((t, idx) => (
            <Card key={idx} sx={{ minWidth: 340, maxWidth: 390, p:2, borderRadius: 4, height: 260, background: '#f6f9fb', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={t.photo} sx={{ width: 68, height: 68, mb: 2 }} />
                <Typography variant="subtitle1" fontWeight="bold">{t.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                  "{t.text}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Decorative Footer Graphic */}
      <Box sx={{ mt: 10, mb: 2, textAlign: 'center' }}>
        <img src="https://images.unsplash.com/photo-1550831107-1553da eight2102?auto=format&fit=crop&w=1500&q=80" width="70%" style={{ maxWidth: 700, borderRadius: 18, opacity: 0.9 }} alt="Healthcare Team" />
      </Box>
    </Box>
  );
};

export default Home;
