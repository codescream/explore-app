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
    clientId={ProcessingInstruction.env.REACT_APP_GOOGLE_CLIENT_ID}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);