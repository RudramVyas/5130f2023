import React from 'react';
import { Container, Grid, Paper, Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './App.css'; // Import a CSS file for custom styles

const App = () => {
  return (
    <div className="app-container">
      <AppBar position="fixed" color="primary" className="app-bar">
        <Toolbar>
          <IconButton color="inherit" onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className="app-title">
            Rajen Vyas
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '80px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="profile-paper">
              <div className="profile-header">
                <img src="/assets/Rajen Vyas/pp.jpg" alt="Photographer" className="profile-picture" />
                <Typography variant="h4" className="profile-name">
                  Rajen Vyas
                </Typography>
              </div>
              <div className="profile-details">
                <Typography variant="body1" className="profile-info">
                  <span className="info-label">City:</span> Vadodara
                </Typography>
                <Typography variant="body1" className="profile-info">
                  <span className="info-label">Mode:</span> DSLR
                </Typography>
                <Typography variant="body1" className="profile-info">
                  <span className="info-label">Type:</span> Nature Photography
                </Typography>
                <Typography variant="body1" className="profile-info">
                  <span className="info-label">Phone No:</span> 9824008479
                </Typography>
                <Typography variant="body1" className="profile-info">
                  <span className="info-label">Achievements:</span> Practicing since 5 years
                </Typography>
              </div>
              <Button variant="contained" color="primary" className="contact-button">
                Contact
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Grid item xs={6} key={index} className="photo-grid-item">
                  <img
                    src={`/assets/Rajen Vyas/${index + 1}.jpg`}
                    alt={`Photo ${index + 1}`}
                    className="photo-image"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
