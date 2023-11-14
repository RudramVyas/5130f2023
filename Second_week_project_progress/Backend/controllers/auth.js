import User from '../models/users';
import express from 'express';
const nodemailer = require('nodemailer');
import { hashPassword, comparePassword } from '../utils/auth';
import { nanoid } from 'nanoid';
// Create or update a user profile
export const createOrUpdateUserProfile = async (req, res) => {
    try {
        const {
            name, city, mode, type, phone, achievements, email, link,
        } = req.body;

        // You may want to validate the data here

        // Check if a user profile already exists
        let userProfile = await User.findOne({ email: email });

        if (!userProfile) {
            // If the user profile doesn't exist, create a new one
            userProfile = new User({
                name,
                city,
                mode,
                type,
                phone,
                achievements,
                email,
                link,
            });
        } else {
            userProfile.name = name;
            userProfile.city = city;
            userProfile.mode = mode;
            userProfile.type = type;
            userProfile.phone = phone;
            userProfile.achievements = achievements;
            userProfile.link = link;
        }
        await userProfile.save();

        res.json({ ok: true, message: 'User profile created or updated successfully' });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error. Try again.');
    }
};

// Fetch the user profile
export const fetchUserProfile = async (req, res) => {
    try {
        const userProfile = await User.findOne({ email: req.params.email }); 

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.json({ userProfile });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error. Try again.');
    }
};

export const signUp = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      let hashedPassword = await hashPassword(password);
      let otp = nanoid(6).toUpperCase();
      // Create a new user
      const newUser = new User({ firstName, lastName, email, password:hashedPassword,otp});
      await newUser.save();
  
      // Generate a confirmation link (replace 'YOUR_SERVER_URL' with your actual server URL)
      const confirmationLink = `http://localhost:3000/confirm/setup-profile/${newUser._id}/${otp}`;
  
      // Send a confirmation email
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dorothea59@ethereal.email',
            pass: 'z1gUwvQ6A6demdkgPK'
        }
    });
  
      const mailOptions = {
        from: 'dorothea59@ethereal.email', // Replace with your Gmail email
        to: email,
        subject: 'Thank You for Signing Up',
        html: `
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for signing up with us!</p>
          <p>Please click the following link to confirm your email and create your profile:</p>
          <a href="${confirmationLink}">${confirmationLink}</a>
          <p>Best regards,</p>
          <p>Your Company Name</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({ message: 'User registered successfully. Confirmation email sent.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error. Try again.' });
    }
  };