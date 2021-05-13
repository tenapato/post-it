import React from 'react'; 
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles';

const Posts = ({ post, setCurrentId}) =>{
    const posts = useSelector((state) => state.posts);  //fetch posts
    const classes = useStyles();

    console.log(posts);
    return (
        !posts.length ? <CircularProgress/>: ( //if posts length = 0, then show a circular progress, else show the posts
            <Grid className={classes.container} container alignItems = "stretch" spacing ={3}>
                {posts.map((post) => ( //Send each retrived post to a post component
                    <Grid key = {post.id} item xs={12} sm = {6}>
                        <Post post = {post} setCurrentId={setCurrentId} />  
                    </Grid>
                ))}
            </Grid>
        )
         
    );
}

export default Posts;