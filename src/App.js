import React from "react";
import {Container} from '@material-ui/core';

import { BrowserRouter,Switch,Route} from "react-router-dom";
//import BackgroundWrapper from "./backgroundWrapper";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID="358467555656-v00nobb9tdee7l5nr6g35jt11llsndb0.apps.googleusercontent.com";

const App=()=>{  
    return (
  
       <BrowserRouter>
      <Container maxWidth="lg">
        
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/auth" exact component={Auth}/>
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