import React, { useState } from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
const Form = () =>{
    const [postData, setPostData] = useState({ //Get data to add to a post
        author: '', title: '', message: '', tags: '', selectedFile: '',
    });
    const classes = useStyles();

    const handleSubmit = () =>{

    };

    const clear = () =>{

    };
    return (
        //<h1 className = {classes.form}>FORM</h1>
        <Paper className = {classes.paper}>
            <form autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            <Typography variant = "h6">Create a Post</Typography>
            <TextField name = "author" variant = "outlined" label ="Author" fullWidth value = {postData.author} onChange = {(e) => setPostData({ ...postData, author: e.target.value})}/>
            <TextField name = "title" variant = "outlined" label ="Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({ ...postData, title: e.target.value})}/>
            <TextField name = "message" variant = "outlined" label ="Message" fullWidth value = {postData.message} onChange = {(e) => setPostData({ ...postData, message: e.target.value})}/>
            <TextField name = "tags" variant = "outlined" label ="Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({ ...postData, tags: e.target.value})}/>
            <div className = {classes.fileInput}>
                <FileBase type = "file" multiple = {false} onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})} />
            </div>
            <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = "large" type = "submit" fullWidth> Postear</Button>
            <Button  variant = "contained" color = "secondary" size = "small" onClick = {clear} fullWidth> Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;