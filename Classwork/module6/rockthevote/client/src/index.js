import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserProvider from './context/UserProvider.js';

import App from './App.js';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      { 
      <App />
      }
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)