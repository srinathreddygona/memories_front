import React from 'react';
import  ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {legacy_createStore,applyMiddleware,compose} from 'redux';
import {thunk} from 'redux-thunk';
import App from './App'; 
import './index.css';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';
const store=legacy_createStore(reducers,compose(applyMiddleware(thunk)));
const CLIENT_ID=process.env.REACT_APP_GOOGLE_ID;

ReactDOM.render(
    <GoogleOAuthProvider clientId="358467555656-r6j6e49ra6bcpmosr4h34fehfauf6hg9.apps.googleusercontent.com">
<Provider store={store}>
<App/>


</Provider>
</GoogleOAuthProvider>
,document.getElementById('root')
);

