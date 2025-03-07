import React from "react";

import { useSelector } from "react-redux";


import Post from "./Post/Post";
import useStyles from './styles';
import { CircularProgress, Grid } from "@material-ui/core";

const Posts=({setCurrentId})=>{
    const {posts,isLoading}=useSelector((state)=>state.posts);
    const classes=useStyles();

    //console.log(posts);
    if(!posts.length && !isLoading) return 'No posts';


    return(
      isLoading? <CircularProgress/>:(
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post)=>(
                <Grid key={post._id} item xs={12} sm={6} md={4} lg={4}> 
                    <Post post ={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))}

        </Grid>
      )
    );
}
export default Posts;