import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter';
import Auth from './components/Auth';

const App = () => {
  const authToken = useSelector(({ auth }) => auth.token);
  const loggedIn = authToken || sessionStorage.getItem('jwt');
  return (
    <div className={loggedIn ? 'flex h-screen bg-gray-50' : 'bg-gray-50'}>
      <ToastContainer autoClose={2500} position="top-right" closeButton={false} />
      <Router>{loggedIn ? <AppRouter /> : <Auth />}</Router>
    </div>
  );
};

export default App;
