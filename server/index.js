import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from  './routes/posts.js';
import userRoutes from  './routes/users.js';
import redis from 'redis';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));  //set a limit for file size
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);  //Every route start with posts
app.use('/user', userRoutes); // Route for users endpoint

//Connect to MongoDB Atlas


const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);


/*const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
}); */

//const client = redis.createClient(process.env.REDIS_URL); //Redis connection
const client = redis.createClient({
    host: 'redis-13279.c62.us-east-1-4.ec2.cloud.redislabs.com',
    port: 13279,
    password: 'xpyHDejjVgip55uKtLYWYDek8SxNKNN5'
})


client.on('error', err => {
    console.log('Error ' + err);
});

export default client;

//client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
/*client.hgetall("hosts", function (err, obj) {
    console.dir(obj);
});*/