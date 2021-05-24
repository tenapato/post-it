// Handlers for all the routes in
// Simplifies the code if needed to to be upgraded

import PostMessage from '../models/postMessage.js';  //import the schema for the posts
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {  //Fetching all existing posts
    //res.send('Working!');
    try {
        const postMessages = await PostMessage.find(); //it is an asynchronous action
        console.log(postMessages); 

        res.status(200).json(postMessages);  //if everything went fine
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    //res.send('Post Creation');
    const post = req.body;
    const newPost = new PostMessage(post);  //Creates a new post with the info that it receives from the frontend

    try {
        await newPost.save();
        res.status(201).json(newPost); //Sends new post to DB
    } catch (error) {  
        res.status(409).json({message : error.message}); //creation error
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params; 
    const post = req.body; //Post Data

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, {new:true});

    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndRemove(id);

    res.json( {message: 'Post has been deleted succesfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'}); //No user is logged in

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId)); //Check if that person by id already liked that post

    if(index === -1) { //If user has not liked the post
        //Like the post
        post.likes.push(req.userId);
    } else {
        // Dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost);
}