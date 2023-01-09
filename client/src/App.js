// import logo from './logo.svg';
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Logo from './assets/memories.jpeg';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { GET_ALL_POSTS } from './redux/actionTypes';
import { useStyles } from './styles';

function App() {
  const [currentId,setCurrentId] = useState(null);
  const {classes} = useStyles();
  const dispatch = useDispatch();

  const getAllposts = async ()=>{
    try {
        const resp = await axios.get('http://localhost:5000/post');
        console.log('resp =',resp.data.posts);
        dispatch({
          type:GET_ALL_POSTS,
          payload: resp.data.posts
        })
    } catch (error) {
        console.log(error.message);
    }
  }

useEffect(()=>{
  getAllposts()
},[]);

  // getAllposts();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant='h2' className={classes.heading} align='center' sx={{fontSize:{xs:'30px',md:'50px'}}} >MEMORIES</Typography>
        <img src={Logo} alt="logo" width={60} className={classes.image}/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid   sx={{flexDirection:{xs:'column-reverse',sm:'row', md:'row'}}} container justify="space-between"  alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
