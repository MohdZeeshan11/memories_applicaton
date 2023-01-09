import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useStyles } from "./styles";
import FileBase from "react-file-base64";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CREATE_POST, UPDATE_POST } from '../../redux/actionTypes';


const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
    })
    const dispatch = useDispatch();
    const {classes} = useStyles();

    console.log('currentId = ',currentId);

    const getValueForInput = (incoming) => {
        let value;
        if (incoming.target) {
            if (incoming.target.value !== undefined) {
                value = incoming.target.value;
            }
        } else {
            value = incoming;
        }
        return value;
    };
      const changeHandler = (name) => (inputValue) => {
        const value = getValueForInput(inputValue);
        setPostData((data) => ({
          ...data,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId){
            try {
                const resp = await axios.patch(`http://localhost:5000/post/${currentId}`,postData);
                console.log('updatedPost = ',resp)
                dispatch({
                    type:UPDATE_POST,
                    payload:resp.data.updatePost,
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                const resp = await axios.post('http://localhost:5000/post',postData);
                dispatch({
                    type:CREATE_POST,
                    payload:resp.data,
                })
            } catch (error) {
                console.log(error.message);
            }
        }

        setPostData({...postData,creator: "", title: "", message: "", tags: "", selectedFile: "",});
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };

     

      const getAllposts1 = async (currentId)=>{
        try {
            const resp = await axios.get('http://localhost:5000/post');
            const singlePost = resp.data.posts.filter((post)=> post._id === currentId);
            setPostData(...singlePost);
        } catch (error) {
            console.log(error.message);
        }
      }
    
    useEffect(()=>{
      getAllposts1(currentId)
    },[currentId]);
  return (
    <Paper className={classes.paper} >
        <Typography variant="h6">Creating a Memory</Typography>
        <form  className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate  onSubmit={handleSubmit}>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData?.creator} 
                onChange={changeHandler('creator')} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData?.title}
                onChange={changeHandler('title')}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData?.message}
                onChange={changeHandler('message')}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData?.tags}
                onChange={(e)=> {setPostData({...postData,tags:e.target.value.split(',')})}}/>
            <div className={classes.fileInput} >
                <FileBase style={{width:'100%'}} type="file" multiple={false} onDone={({ base64 })=>setPostData({ ...postData, selectedFile: base64 })}/>
            </div>
            <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
            >
            Submit
            </Button>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
                onClick={clear}
            >
            Clear
            </Button>
      </form>
    </Paper>
  )
}

export default Form;