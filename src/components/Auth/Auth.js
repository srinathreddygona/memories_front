import React, { useState } from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import {  GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import {signin,signup} from '../../actions/auth';

import { Google } from '@material-ui/icons';  // This is the default Google logo icon

import { jwtDecode } from "jwt-decode";
import { useHistory } from 'react-router-dom';

const initialState={firstName: '',lastName: '',email: '',password: '',confirmPassword: ''}
const Auth = () => {
    const classes=useStyles();
    const [ShowPassword,setShowPassword] =useState(false);
    const [isSignup,setIsSignup]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const history=useHistory();
   
    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);

    const handleSubmit=(e)=>{
      e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

        
    }
    const switchMode=()=>{
            setIsSignup(prevIsSignup=>!prevIsSignup);
            setShowPassword(false);
    }
    const googleSuccess=async(res)=>{
        //old version
        // const result=res?.profileObj;
        // const token=res?.tokenId;
        // try {
        //     dispatch({type:'AUTH',data:{result,token}});
        // } catch (error) {
        //     console.log(error);
        // }
        console.log('Google Login Response:', res); // This should show the response object structure

        if (res?.credential) {
            //  using the new Google Identity Services API
            const tokenId = res.credential;
            console.log('Token ID:', tokenId);
            
            const decodedToken = jwtDecode(tokenId);
            console.log('Decoded Token:', decodedToken);
            
            dispatch({ type: 'AUTH', data: { token: tokenId, result: decodedToken } });
            history.push('/');

        } else {
            console.log('No credential or profileObj found');
        }
    }
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google Sign in was unsuccessful. Try again later")
    }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant ="h5" >{isSignup? 'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                            <Input name="firstName" label="First Name"  handleChange={handleChange} autoFocus half/>
                            <Input name="lastName" label="Last Name"  handleChange={handleChange} half/>

                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={ShowPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                     {isSignup && <Input name="confirmPassword" label="Repeat Password " handleChange={handleChange} type="password" />}

                </Grid>
               

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup?'Sign Up' :'Sign In'}
                </Button>
               
                <GoogleLogin 
                    

                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    //useOneTap={true}          // Use one-tap authentication for a streamlined UX (optional)
                    render={(response) => (
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={response.onClick}
                            disabled={response.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                            
                
                        >
                        Google Sign In
                        </Button>
                    )}
                    shape="pill"  // Customize the shape (e.g., pill or circle)
                    theme="outline" // Theme options: 'outline' or 'filled_blue'
                    size="large"    // Button size: 'small', 'medium', or 'large'
                    text="Sign in with Google" 
                />
               
                <Grid container justify-content="flex-end">
                    <Grid>
                        <Button onClick={switchMode}>
                            {isSignup?' Already have an account? Sign In!': "Don't have an account? SIgn Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
   
  );
}

export default Auth;
