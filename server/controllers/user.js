// Logic for signing in and signing up the user
// This code also verifies the user data and creates its token
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import UserModal from "../models/user.js";
import client from '../index.js';



const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    client.set(String(token), email); //Save token in redis 
    client.expire(String(token), 3600); // Token expires in 1h

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    // ------ Redis Env Variable
    
    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    //client.hset("users","token", String(token));
    client.set(String(token), email); //Save token in redis 
    client.expire(String(token), 3600); // Token expires in 1h


    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};


export const users = async (req, res) => {

  try {
    const userData = await UserModal.find();
    
    res.status(200).json(userData);
    console.log(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
}