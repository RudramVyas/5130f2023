// HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to SnapSolution
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Empower your photography journey with SnapSolution - the platform for photographers to showcase
        their work, connect with clients, and grow their business.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              alt="Create Your Profile"
              src="https://placekitten.com/600/400" // Replace with an actual image URL
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create Your Profile
              </Typography>
              <Typography>
                Build a stunning profile to showcase your portfolio, skills, and expertise.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              alt="List Your Services"
              src="https://placekitten.com/601/400" // Replace with an actual image URL
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                List Your Services
              </Typography>
              <Typography>
                Display your photography services, pricing, and availability for potential clients.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
        Join SnapSolution today to unlock a world of opportunities in the photography industry. Whether
        you're a seasoned professional or just starting, SnapSolution is the perfect platform for you.
      </Typography>
      <Button component={Link} to="/signup" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
        Join Now
      </Button>
    </Container>
  );
};

export default App;
