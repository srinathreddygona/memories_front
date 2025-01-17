import React,{useState,useEffect} from "react";
import { TextField,Button,Typography,Paper } from "@material-ui/core";
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Form=({currentId,setCurrentId})=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const history=useHistory();
    const [postData,setPostData]=useState({
        title:'',message:'',tags:'',selectedFile:''
    });
    const post=useSelector((state)=>currentId?state.posts.posts.find((p)=>p._id===currentId):null);
    useEffect(()=>{
        
        if(post) setPostData(post);

    },[post]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("im here")
        if(currentId===0){
            
            dispatch(createPost({...postData,name: user?.result?.name},history)); 
           // history.push(`/posts/${data._id}`);
        }
      else { 
        dispatch(updatePost(currentId,{...postData,name :user?.result?.name}));
    }
      clear();
    }
    const clear=()=>{
            setCurrentId(0);
            setPostData({ title:'',message:'',tags:'',selectedFile:''});
    }


    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant ="h6"align="center">
                    Please Sign in to create your own memory and to like other's memories
                </Typography> 

            </Paper>
        )
    }


    return(
        <Paper className={classes.Paper} raised elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6" >{currentId?'Editing ':'Creating '}a Memory..</Typography>
          
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth multiline  value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags (comma-separated)" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})}/>
            <div className={classes.fileInput}>
                  <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile: base64})}/>
                  
            </div>

            <Button className={classes.buttonSubmit}variant="contained" color="primary" size="large" type="submit" fullWidth>
                Submit
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                Clear
            </Button>

            </form>

        </Paper>
    );
}
export default Form;