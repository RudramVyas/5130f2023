import React, { useState } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Grid,
  TextField,
  Avatar,
  Input,
} from '@mui/material';
import Axios from 'axios';

const steps = ['Personal Information', 'Contact Details', 'Review and Submit'];

const ConfirmationApp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    mode: '',
    type: '',
    phone: '',
    achievements: '',
    profileImage: null,
    collectionImages: [],
  });

  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (field, files) => {
    if (files.length > 0) {
      const fileArray = Array.from(files);
      setData((prevData) => ({
        ...prevData,
        [field]: field === 'profileImage' ? fileArray[0] : fileArray,
      }));
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('profileImage', data.profileImage);
      data.collectionImages.forEach((image) => {
        formData.append('collectionImages', image);
      });

      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('city', data.city);
      formData.append('mode', data.mode);
      formData.append('type', data.type);
      formData.append('phone', data.phone);
      formData.append('achievements', data.achievements);

      await Axios.post('YOUR_SERVER_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data submitted successfully!');
      // You can add additional handling like showing a success message or redirecting the user
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mode"
                variant="outlined"
                fullWidth
                value={data.mode}
                onChange={(e) => handleChange('mode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                value={data.type}
                onChange={(e) => handleChange('type', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Achievements"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={data.achievements}
                onChange={(e) => handleChange('achievements', e.target.value)}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <div>
            <Typography variant="body1">
              Please review your information before submitting.
            </Typography>
            <div style={{ marginTop: '20px' }}>
              <Avatar
                alt="Profile Image"
                src={data.profileImage ? URL.createObjectURL(data.profileImage) : ''}
                sx={{ width: 100, height: 100, marginRight: '10px' }}
              />
              <Grid container spacing={2}>
                {data.collectionImages.map((image, index) => (
                  <Grid item key={index}>
                    <Avatar
                      alt={`Collection Image ${index + 1}`}
                      src={URL.createObjectURL(image)}
                      sx={{ width: 60, height: 60, marginRight: '10px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5">Thank you for submitting!</Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5">{steps[activeStep]}</Typography>
            {getStepContent(activeStep)}
            <div style={{ marginTop: '20px' }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                style={{ marginLeft: '10px' }}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
            {activeStep === 0 && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Upload Profile Image</Typography>
                <Input type="file" onChange={(e) => handleImageChange('profileImage', e.target.files)} />
              </div>
            )}
            {activeStep === 1 && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6">Upload Collection Images</Typography>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => handleImageChange('collectionImages', e.target.files)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ConfirmationApp;
