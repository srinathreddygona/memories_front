import React from "react";
import { Card,CardActions,CardContent,CardMedia,Button,Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import  MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from "react-redux";

import { deletePost,likePost } from "../../../actions/posts"; 
import { useHistory } from "react-router-dom";

const Post=({post,setCurrentId})=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem('profile'));
    const Likes=()=>{
        const likes = post.likes || [];  // Default to an empty array if post.likes is undefined
    if (likes.length > 0) {
        return likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
const history=useHistory();
const openPost=()=>{   
history.push(`/posts/${post._id}`);
 }

    return(
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
              className={classes.cardAction}
              onClick={openPost}
            >
            <CardMedia className={classes.media} image={post.selectedFile || "https://via.placeholder.com/150"} title={post.title}/>
            
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.sub===post?.creator||user?.result?._id===post?.creator)&&
             <div className={classes.overlay2}>
             <Button 
             style={{color:'white'}}
             size="small" 
             onClick={()=>setCurrentId(post._id)}>
             <MoreHorizIcon fontSize="medium"/>
             </Button>
             </div>}
           
            <div className={classes.details}>
               <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
              
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title}</Typography>

            <CardContent>
            <Typography variant="body2"color="textSecondary" component="p" > {post.message}</Typography>

            </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result}onClick={()=>dispatch(likePost(post._id))}>
                   <Likes/>
                   
                </Button>
                {(user?.result?.sub===post?.creator||user?.result?._id===post?.creator)&&( <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                        Delete
                </Button>)}
               
            </CardActions>

        </Card>
    );
}
export default Post;
