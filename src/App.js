import React, { useState,useEffect } from "react";
import memories from './images/memories.jpg';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
import { useDispatch } from "react-redux";
//import BackgroundWrapper from "./backgroundWrapper";
import {getPosts} from './actions/posts';
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
//import useStyles from './styles';



const App=()=>{
    //const classes=useStyles();
    const dispatch=useDispatch();
    const [currentId,setCurrentId]=useState(null);




    useEffect(()=>{
            dispatch(getPosts());
    },[dispatch]);

    return (
      
      <Container maxWidth="lg">
        <AppBar style={{borderRadius: 15, margin: '30px 0',display: 'flex', flexDirection: 'row',justifyContent:'center',alignItems: 'center', }} position="static" color="inherit" >
          <Typography style={{ color: 'rgba(0,183,255, 1)' }} variant="h2">
                Memories
          </Typography>
          <img style={{ marginLeft: '5px' }} src={memories} alt="memories" height="50" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid  container  justifyContent='space-between' alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}  />
                    </Grid>
                </Grid>
            </Container>

        </Grow>

      </Container>
      
    );
}
export default App;