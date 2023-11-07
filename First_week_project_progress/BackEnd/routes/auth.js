import express from 'express';
import {createOrUpdateUserProfile,fetchUserProfile} from "../controllers/auth";
const router=express.Router();

//User Routes
router.post("/create_update_profile",createOrUpdateUserProfile);
router.post("/fetch_profile", fetchUserProfile);

module.exports =router;