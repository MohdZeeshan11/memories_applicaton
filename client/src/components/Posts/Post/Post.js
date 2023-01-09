import React from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useStyles } from "./styles";
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DELETE_POST, LIKE_POST } from '../../../redux/actionTypes';
import picture from '../../../assets/image1.png'

const Post = ({post,setCurrentId}) => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const deletePostHandler = async (id)=>{
        try {
            const resp = await axios.delete(`http://localhost:5000/post/${id}`);
            console.log('resp delete =',resp.data.deletePost._id);
            dispatch({
                type:DELETE_POST,
                payload:resp.data.deletePost._id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const likePostHandler = async (id)=>{
        try {
            const resp = await axios.patch(`http://localhost:5000/post/${id}/likePost`);
            dispatch({
                type:LIKE_POST,
                payload:resp.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <Card className={classes.card}>
        <CardMedia className={classes.media} image={post?.selectedFile || picture} title={post?.title}/>
        <div className={classes.overlay}>
            <Typography variant='h6'>{post?.creator}</Typography>
            <Typography variant='body2'>{moment(post?.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.overlay2}>
            <Button style={{color:'white'}} size="small" onClick={()=>{
                setCurrentId(post?._id);
            }} >
                <MoreHorizIcon/>
            </Button>
        </div>
        <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post?.title}</Typography>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post?.message}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions} >
            <Button size="small" color="primary" onClick={()=>likePostHandler(post?._id)}> 
                <ThumbUpAltIcon fontSize="smaall" />
                &nbsp;Like &nbsp; {post.likeCount}
            </Button>
            <Button size="small" color="primary" onClick={()=>deletePostHandler(post?._id)}> 
                <DeleteIcon fontSize="smaall" />
                Delete
            </Button>
        </CardActions>
    </Card>
  )
}

export default Post;