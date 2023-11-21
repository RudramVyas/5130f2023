import express from 'express';
import {createOrUpdateUserProfile,fetchUserProfile,signUp,signIn} from "../controllers/auth";
const router=express.Router();

//User Routes
router.post("/create_update_profile",createOrUpdateUserProfile);
router.post("/fetch_profile", fetchUserProfile);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports =router;