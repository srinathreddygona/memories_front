import React from "react";
import {Container} from '@material-ui/core';

import { BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import UserProfile from './components/UserProfile/UserProfile';
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
 


const App=()=>{  
  const user=JSON.parse(localStorage.getItem('profile'));
  console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID,"say hi");
    return (
  
       <BrowserRouter>
      <Container maxWidth="xl">
        
        <Navbar/>
        <Switch>
          <Route path="/" exact component={()=><Redirect to ="/posts"/>}/>
          <Route path="/posts" exact component={Home}/>
          <Route path="/posts/search" exact component={Home}/>
          <Route path="/user/:id" exact component={UserProfile} />
          <Route path="/user/:id/search" exact component={UserProfile} />

          <Route path="/posts/:id"  component={PostDetails}/>
          <Route path="/auth" exact component={()=>(!user?<Auth/> :<Redirect to="/posts"/>)}/>
        </Switch>
        
      </Container>
      </BrowserRouter>
     
      
    );
}
export default App;

{/* <AppBar style={{borderRadius: 15, margin: '30px 0',display: 'flex', flexDirection: 'row',justifyContent:'center',alignItems: 'center', }} position="static" color="inherit" >
          <Typography style={{ color: 'rgba(0,183,255, 1)' }} variant="h2">
                Memories
          </Typography>
          <img style={{ marginLeft: '5px' }} src={memories} alt="memories" height="50" />
        </AppBar> */}