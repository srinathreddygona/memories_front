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
const CLIENT_ID=process.env.REACT_APP_GOOGLE_CLIENT_ID;

ReactDOM.render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
<Provider store={store}>
<App/>
</Provider>
</GoogleOAuthProvider>
,document.getElementById('root')

);

