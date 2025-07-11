import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserIdProvider } from './providers/usersIdProviders';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserIdProvider>
    <App />
    </UserIdProvider>
  </React.StrictMode>
  
);
