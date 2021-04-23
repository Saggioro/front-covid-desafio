import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/auth';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
