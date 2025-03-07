import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { AppBar,Avatar,Toolbar,Typography,Button } from '@material-ui/core'
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

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
    const handleProfileClick = () => {
        const userId = user?.result?._id || user?.result?.sub; // Use sub for Google users
        if (userId) {
          history.push(`/user/${userId}`);
        } else {
          console.error('User ID is undefined');
        }
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
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Link to="/" className={classes.brandContainer}>
            <img src={memoriesText} alt="icon" height="45px"/>
            <img className={classes.image} src={memoriesLogo} alt="memories" height="40"/>
          </Link>
          <Toolbar className={classes.toolbar}>
            {user ? (
              <div className={classes.profile}>
                {/* Clickable Avatar */}
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                  {user.result.name.charAt(0)}
                </Avatar>
                {/* Clickable Username */}
                <Typography className={classes.userName} variant="h6" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
                  {user.result.name}
                </Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
            )}
          </Toolbar>
        </AppBar>
      );
};

export default Navbar;
