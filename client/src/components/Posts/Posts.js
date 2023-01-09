import React from 'react'
import { CircularProgress, Grid } from '@mui/material';
import { useStyles } from "./styles";
import Post from './Post/Post';
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
  const postList = useSelector((state) => state.postData);
  console.log("reduce ",postList);
  const classes = useStyles();
  return (
    <>{postList.length===0?<CircularProgress />:
    (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
        {postList.reverse().map((post)=>
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        )}
      </Grid>
    )
    }</>
  )
}

export default Posts;