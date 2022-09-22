import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/router';
import Logout from './components/Logout';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${sessionStorage.getItem('token')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use(
  (res) => {
    console.log('Response intercepted');
    return Promise.resolve(res);
  },
  (err) => {
    console.log('Response Intercepted Error');
    return Promise.reject(err);
  }
);

axios.interceptors.request.use(
  (config) => {
    console.log('Request intercepted');

    if (!config.headers.Authorization) {
      const token = sessionStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (err) => {
    console.log('Request Intercepted Error');
    return Promise.reject(err);
  }
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Logout>
        <Router />
      </Logout>
    </BrowserRouter>
  </StrictMode>
);
