import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from  './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);  //Every route start with posts

app.use(bodyParser.json({ limit: "30mb", extended: true}));  //set a limit for file size
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//Connect to MongoDB Atlas

const CONNECTION_URL = "mongodb+srv://proyectofinal_123:proyectofinal_123@cluster0.ofrja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);