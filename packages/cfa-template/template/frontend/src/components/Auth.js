import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import CreateUser from './CreateUser';

const Auth = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/register" element={<CreateUser />} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);

export default Auth;
