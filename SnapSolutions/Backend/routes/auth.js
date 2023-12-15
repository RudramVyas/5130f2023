import express from 'express';
import {createOrUpdateUserProfile,fetchUserProfile,signUp,signIn} from "../controllers/auth";
import {confirmation,updateUser,getAllPhotographers,photographer,connfirmclient} from "../controllers/user";
import {isPhotographer,requireSignin} from "../middlewares"

const router=express.Router();


//User Routes
router.post("/create_update_profile",createOrUpdateUserProfile);
router.get("/fetch_profile", fetchUserProfile);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/confirmation",confirmation);
router.post("/updateUser",requireSignin,isPhotographer,updateUser)
router.get("/photographers", getAllPhotographers);
router.get("/photographers/:id", photographer);
router.post("/connfirmclient",connfirmclient);


module.exports =router;