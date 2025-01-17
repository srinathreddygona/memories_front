import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { AppBar,Avatar,Toolbar,Typography,Button } from '@material-ui/core'
import useStyles from './styles';
import memories from '../../images/memories.jpg';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
    const classes=useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const history=useHistory();
    const location=useLocation();

    const logout=()=>{
        dispatch({type:'LOGOUT'});

        history.push('/');

        setUser(null);
    };
    useEffect(()=>{
        const token=user?.token;
        //jwt;
        if(token){
            const decodedToken=jwtDecode(token);

            if(decodedToken.exp *1000< new Date().getTime())logout();
        }


        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location]);


    
    return (
    <AppBar className={classes.appBar} position="static" color="inherit" >
      <div className={classes.brandContainer}>
        <Typography className={classes.heading}  variant="h2" align="center">
            Memories
        </Typography>
        <img className={classes.image}  src={memories} alt="memories" height="50" />
     </div>
     <Toolbar className={classes.toolbar}>
        {user ?(
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName}variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(
            <Button component={Link} to ="/auth" variant="contained"  color="primary">Sign in</Button>
        )}
     </Toolbar>
  </AppBar>
  );
};

export default Navbar;
