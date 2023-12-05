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
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Stylish Banner */}
      <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(to right, #000000, #434343)' }}>
        <Typography variant="h4" component="h1" gutterBottom style={{ marginBottom: '10px' }}>
          SnapSolution Photography
        </Typography>
        <img
          src="https://www.designmantic.com/blog/wp-content/uploads/2020/01/Photography-Logos-718x300.png" // Replace with your actual logo URL
          alt="SnapSolution Logo"
          style={{ width: '150px', borderRadius: '50%', border: '2px solid white' }}
        />
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Empowering Your Photography Journey
        </Typography>
      </div>

      {/* Main Content */}
      <Container maxWidth="md" style={{ marginTop: '20px', flex: '1' }}>
        <Typography variant="body1" align="center" paragraph>
          Showcase your work, connect with clients, and grow your photography business with SnapSolution.
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={3}>
          {/* Create Your Profile Card */}
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

          {/* List Your Services Card */}
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

        {/* Call to Action */}
        <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
          Join SnapSolution today to unlock a world of opportunities in the photography industry. Whether you're a seasoned professional or just starting, SnapSolution is the perfect platform for you.
        </Typography>

        {/* Sign Up Button */}
        <Button component={Link} to="/signup" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Join Now
        </Button>
      </Container>
    </div>
  );
};

export default App;
