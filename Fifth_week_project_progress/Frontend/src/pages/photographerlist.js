// PhotographersList.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const photographersData = [
  {
    id: 1,
    name: 'Rajen Vyas',
    city: 'Vadodara',
    mode: 'DSLR',
    type: 'Nature Photography',
    phone: '9824008479',
    achievements: 'Practicing since 5 years',
    photos: Array.from({ length: 10 }, (_, index) => `/assets/Rajen Vyas/${index + 1}.jpg`),
  },
  // Add more photographers as needed
];

const PhotographersList = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPhotographers = photographersData.filter((photographer) =>
    photographer.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} style={{ marginBottom: '20px' }}>
        Back to Home
      </Button>
      <Typography variant="h4" gutterBottom>
        Photographers List
      </Typography>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="filter-label">Filter by Type</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Nature Photography">Nature Photography</MenuItem>
          {/* Add more filter options based on photographer types */}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {filteredPhotographers.map((photographer) => (
          <Grid item xs={12} md={4} key={photographer.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                alt={photographer.name}
                src={photographer.photos[0]} // Display the first photo as a preview
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {photographer.name}
                </Typography>
                <Typography>
                  {photographer.city}, {photographer.mode}
                </Typography>
                <Button
                  component={Link}
                  to={`/photographer/${photographer.id}`} // Link to the photographer's full profile page
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '10px' }}
                >
                  See More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PhotographersList;
