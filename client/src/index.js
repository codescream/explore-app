import React from 'react';
import { createRoot }  from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider
    clientId='221110187907-0lsck5rqjosb6rbflf6ndk69h35vkp1u.apps.googleusercontent.com'
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);