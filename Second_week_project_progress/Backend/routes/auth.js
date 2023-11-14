import express from 'express';
import {createOrUpdateUserProfile,fetchUserProfile,signUp} from "../controllers/auth";
const router=express.Router();

//User Routes
router.post("/create_update_profile",createOrUpdateUserProfile);
router.post("/fetch_profile", fetchUserProfile);
router.post("/signup", signUp);

module.exports =router;