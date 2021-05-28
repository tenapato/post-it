import axios from 'axios';
//import redis from 'redis';
//import { AxiosRedis } from '@tictactrip/axios-redis';

const API = axios.create({ baseURL: 'http://localhost:80'}); //Axios instance

//const client = redis.createClient(process.env.REDIS_URL);

//client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");
/*client.hgetall("hosts", function (err, obj) {
    console.dir(obj);
});*/
//const axiosRedis = new AxiosRedis(redis);


//const url = 'http://localhost:80/posts';

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
// Api posts endpoints
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);



// Api user endpoints

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchUsers = () => API.get('/user');
export const deleteUser = (id) => API.delete(`/user/${id}`);