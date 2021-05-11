// Handlers for all the routes in
// Simplifies the code if needed to to be upgraded

import PostMessage from '../models/postMessage.js';  //import the schema for the posts


export const getPosts = async (req, res) => {  //Fetching all existing posts
    //res.send('Working!');
    try {
        const postMessages = await PostMessage.find(); //it is an asynchronous actio
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