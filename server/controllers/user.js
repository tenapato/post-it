// Logic for signing in and signing up the user
// This code also verifies the user data and creates its token
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async (req, res) => {
    const {email, password} = req.body; //Getting email and password from the post request

    try {
        const existingUser = await User.findOne({email}); //Find existing user by email

        if(!existingUser) return res.status(404).json({ message: "User does not exist"}); //If no user is found, error 404

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); //If user exists, the compare password to existing password

        if(!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password"}); //If password is incorrect, error 400


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});   //Create Jsonwebtoken, can change this to sessions with Redis (Secret is test)
        
        res.status(200).json({result: existingUser, token}); //Return users new token

    } catch (error) {
        res.status(500).json({message : "Something failed"}); // Return undefined server error
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await Use.findOne({email});
        
        if(existingUser) return res.status(400).json({ message: "User already exist"}); //If user is found, error 400

        if (password !== confirmPasssword) return res.status(400).json({ message: "Passwords do not match"}); //If password does not match

        const hashedPassword = await bcrypt.hash(passsword, 12); //Hash the password with a dificulty of 12

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`}); //Create a user

        const token = jwt.sign({ email: result.email, id: result._id}, 'test', {expiresIn: "1h"});   //Create Jsonwebtoken, can change this to sessions with Redis

        res.status(200).json({result, token}); //Return users new token

    } catch (error) {
        res.status(500).json({message : "Something failed"}); // Return undefined server error
    }
}