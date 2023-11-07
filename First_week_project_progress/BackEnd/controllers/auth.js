import User from '../models/users';
import express from 'express';
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
